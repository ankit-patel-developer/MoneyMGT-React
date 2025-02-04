export function getBankColor(bankName) {
  if (bankName.search("CIBC") !== -1) {
    return "lightsalmon";
  } else if (bankName.search("TD") !== -1) {
    return "lightgreen";
  } else if (bankName.search("RBC") !== -1) {
    return "lightsteelblue";
  } else if (bankName.search("Scotia") !== -1) {
    return "lightpink";
  } else {
    return "white";
  }
}
