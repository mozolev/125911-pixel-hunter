const getOption = (option, index) => `
    <div class="game__option">
      <img class="game__image" src="${option[0]}" alt="Option ${index + 1}" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name="question${index + 1}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>`;

export default (level) => `
    <form class="game__content">
      ${level.map(getOption).join(``)}
    </form>`;