import AbstractPresenter from '../utils/abstract-presenter';
import App from '../app';
import HeaderView from './header-view';
import StatsView from './stats-view';
import {Setting} from '../utils/settings';
import Stat from '../data/stat';
import {StateDataType} from '../data/game-data';


export default class StatsPresenter extends AbstractPresenter {
  private stats: Array<Stat>|null;
  private username: string;

  constructor(username: string) {
    super();

    this.stats = null;

    username;
  }

  init(stats: Array<Stat>) {
    this.stats = stats;

    const headerView = new HeaderView();
    headerView.onBackClick = () => App.showGreeting();

    const statsView = new StatsView(this.stats,
        this._getBonusesPack(this.stats));

    this.addChildren(headerView, statsView);
  }

  private _getBonusesPack(stats: Array<Stat>): Array<any> {
    return stats.map((stat) => this._getBonuses(stat));
  }

  private _getBonuses(state: Stat): Array<any> {
    const bonuses = <Array<any>> [];
    const speedBonuses = state.answers.reduce((acc, answer) => {
      return acc + (answer >= 0 && answer < Setting.MAX_FAST_TIME ? 1 : 0);
    }, 0);
    const livesBonuses = state.lives;
    const slowPenalties = state.answers.reduce((acc, answer) => {
      return acc + (answer >= Setting.MIN_SLOW_TIME ? 1 : 0);
    }, 0);

    if (speedBonuses) {
      bonuses.push({
        title: `Бонус за скорость:`,
        value: speedBonuses,
        quantifier: Setting.SCORE_FAST
      });
    }

    if (livesBonuses) {
      bonuses.push({
        title: `Бонус за жизни:`,
        value: livesBonuses,
        quantifier: Setting.SCORE_LIFE
      });
    }

    if (slowPenalties) {
      bonuses.push({
        title: `Штраф за медлительность:`,
        value: slowPenalties,
        quantifier: Setting.SCORE_SLOW
      });
    }

    return bonuses;
  }
}
