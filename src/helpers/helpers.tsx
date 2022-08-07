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
    let month = "Jan";
    if (date.getMonth() == 2) {
      month = "Feb";
    } else if (date.getMonth() == 3) {
      month = "Mar";
    } else if (date.getMonth() == 4) {
      month = "Apr";
    } else if (date.getMonth() == 5) {
      month = "May";
    } else if (date.getMonth() == 6) {
      month = "Jun";
    } else if (date.getMonth() == 7) {
      month = "Jul";
    } else if (date.getMonth() == 8) {
      month = "Aug";
    } else if (date.getMonth() == 9) {
      month = "Sep";
    } else if (date.getMonth() == 10) {
      month = "Oct";
    } else if (date.getMonth() == 11) {
      month = "Now";
    } else if (date.getMonth() == 12) {
      month = "Dec";
    }

    var formatted =
      date.getDate() + " " + month + " " + (date.getFullYear() - 2000);

    return formatted;
  }
};
