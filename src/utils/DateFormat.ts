const getDate = (dateStr: string) => {
  // Сегодня в 20:30
  // Вчера в 18:23
  // 12 декабря в 13:40

  const date = new Date(Date.parse(dateStr));

  let res = "";

  const now = new Date();

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  if (date.getDay() === now.getDay()) res += "Сегодня ";
  else if (date.getDay() === now.getDay() - 1) res += "Вчера ";
  else res += `${date.getDay()} ${monthNames[date.getMonth()]} `;

  res += date.toLocaleTimeString().slice(0, 5);

  return res;
};

export default getDate;
