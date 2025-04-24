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

export function getBankStyleLocal(bankName) {
  if (bankName.search("CIBC") !== -1) {
    return "CIBC";
  } else if (bankName.search("TD") !== -1) {
    return "TD";
  } else if (bankName.search("RBC") !== -1) {
    return "RBC";
  } else if (bankName.search("Scotia") !== -1) {
    return "Scotia";
  } else {
    return "Unknown";
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

export function getPayeeIcon(payeeType) {
  if (payeeType === 0) {
    return "bi bi-phone-fill";
  }
  if (payeeType === 1) {
    return "bi bi-lightbulb";
  }
  if (payeeType === 2) {
    return "bi bi-house";
  }
  if (payeeType === 3) {
    return "bi bi-credit-card";
  }
  if (payeeType === 4) {
    return "bi bi-asterisk";
  }
  if (payeeType === 5) {
    return "bi bi-cart4";
  }
  if (payeeType === 6) {
    return "bi bi-cart3";
  }
  if (payeeType === 7) {
    return "bi bi-gear";
  }
  if (payeeType === 8) {
    return "bi bi-speedometer2";
  }
  if (payeeType === 9) {
    return "bi bi-cup-straw";
  }
  if (payeeType === 10) {
    return "bi bi-hourglass-top";
  }
  if (payeeType === 11) {
    return "bi bi-hourglass-bottom";
  } else return "bi bi-brightness-high-fill";
}
export function getPayeeTypeName(payeeType) {
  if (payeeType === 0) {
    return "Phone";
  }
  if (payeeType === 1) {
    return "Hydro";
  }
  if (payeeType === 2) {
    return "Rent";
  }
  if (payeeType === 3) {
    return "CreditCard";
  }
  if (payeeType === 4) {
    return "WallMart";
  }
  if (payeeType === 5) {
    return "SuperStore";
  }
  if (payeeType === 6) {
    return "BombaySpices";
  }
  if (payeeType === 7) {
    return "CanadianTire";
  }
  if (payeeType === 8) {
    return "CarService";
  }
  if (payeeType === 9) {
    return "TimHortons";
  }
  if (payeeType === 10) {
    return "Medicine_WalMart";
  }
  if (payeeType === 11) {
    return "Medicine_SuperStore";
  } else return "Others";
}

export function getCCTypeColor(ccName) {
  if (ccName.toLowerCase().search("visa") !== -1) {
    return "orange";
  } else if (ccName.toLowerCase().search("master") !== -1) {
    return "blue";
  } else {
    return "black";
  }
}
