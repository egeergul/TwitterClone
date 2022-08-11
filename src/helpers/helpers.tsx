export const getFormattedDate = (timestamp: number): string => {
  var date = new Date(timestamp);
  var now = Date.now();
  var diff = (now - timestamp) / 1000;

  if (diff < 60 * 60) {
    return (diff / 60).toFixed() + " mins";
  } else if (diff < 60 * 60 * 24) {
    return (diff / (60 * 60)).toFixed() + " h";
  } else if (diff < 60 * 60 * 24 * 7) {
    return (diff / (60 * 60 * 24)).toFixed() + " d";
  } else {
    let month;
    switch (date.getMonth()) {
      case 1:
        month = "Jan";
        break;
      case 2:
        month = "Feb";
        break;
      case 3:
        month = "Mar";
        break;
      case 4:
        month = "Apr";
        break;
      case 5:
        month = "May";
        break;
      case 6:
        month = "Jun";
        break;
      case 7:
        month = "Jul";
        break;
      case 8:
        month = "Aug";
        break;
      case 9:
        month = "Sep";
        break;
      case 10:
        month = "Oct";
        break;
      case 11:
        month = "Nov";
        break;
      case 12:
        month = "Dec";
        break;
    }

    var formatted =
      date.getDate() + " " + month + " " + (date.getFullYear() - 2000);

    return formatted;
  }
};

export const getFormatedDateWithHour = (timestamp: number): string => {
  var date = new Date(timestamp);

  let month;
  switch (date.getMonth()) {
    case 1:
      month = "Jan";
      break;
    case 2:
      month = "Feb";
      break;
    case 3:
      month = "Mar";
      break;
    case 4:
      month = "Apr";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "Jun";
      break;
    case 7:
      month = "Jul";
      break;
    case 8:
      month = "Aug";
      break;
    case 9:
      month = "Sep";
      break;
    case 10:
      month = "Oct";
      break;
    case 11:
      month = "Nov";
      break;
    case 12:
      month = "Dec";
      break;
  }

  var formatted = `${date.getHours()}:${date.getMinutes()} · ${date.getDate()} ${month} ${
    date.getFullYear() - 2000
  }`;

  return formatted;
};
