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

export function getAccountType(ac) {
  if (ac === 0) return "Chequing";
  if (ac === 1) return "Savings";
  if (ac === 2) return "TFSA";
}

export function getAccountColor(acType) {
  if (acType === 0) return "green";
  if (acType === 1) return "blue";
  if (acType === 2) return "red";
}

