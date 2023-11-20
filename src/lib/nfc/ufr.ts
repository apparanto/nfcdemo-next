var qs = require("querystring");

function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export default class UFR {
  serialNumber = "";
  cardId = "";
  reader = "0";
  onlineSerialNumber = "";
  data = "";
  ufr0Response = "0";
  ufr1Response = "0";
  ufr2Response = "0";
  ufr3Response = "0";

  get ONLINE() {
    return 0;
  }
  get UFR1() {
    return 1;
  }
  get UFR2() {
    return 2;
  }
  get BARRIER() {
    return 3;
  }
  get DLIO() {
    return 4;
  }
  get ACT1() {
    return 2;
  }
  get ACT2() {
    return 1;
  }
  get LOW() {
    return 0;
  }
  get HIGH() {
    return 1;
  }
  get INPUT() {
    return 2;
  }

  constructor() {
    this.serialNumber = "";
    this.cardId = "";
    this.reader = "0";
    this.onlineSerialNumber = "";
    this.data = "";
    this.ufr0Response = "0";
    this.ufr1Response = "0";
    this.ufr2Response = "0";
    this.ufr3Response = "0";
  }

  setRequest(data: string) {
    var array;
    if (isJsonString(data)) {
      array = JSON.parse(data);
    } else {
      array = qs.parse(data);
    }

    if (
      array.SN != undefined &&
      array.UID != undefined &&
      array.online != undefined
    ) {
      this.serialNumber = array.SN;
      this.cardId = array.UID;
      this.reader = array.online;
      if (array.OSN != undefined) {
        this.onlineSerialNumber = array.OSN;
      } else {
        this.onlineSerialNumber = "";
      }
      this.data = "0";
      this.ufr0Response = "0";
      this.ufr1Response = "0";
      this.ufr2Response = "0";
      this.ufr3Response = "0";
    } else if (array.OSN != undefined && array.DATA != undefined) {
      this.serialNumber = "0";
      this.cardId = "0";
      this.reader = "0";
      if (array.OSN != undefined) {
        this.onlineSerialNumber = array.OSN;
      } else {
        this.onlineSerialNumber = "";
      }
      this.data = array.DATA;
      this.ufr0Response = "0";
      this.ufr1Response = "0";
      this.ufr2Response = "0";
      this.ufr3Response = "0";
    } else {
      this.serialNumber = "0";
      this.cardId = "0";
      this.reader = "0";
      this.onlineSerialNumber = "0";
      this.data = "0";
      this.ufr0Response = "0";
      this.ufr1Response = "0";
      this.ufr2Response = "0";
      this.ufr3Response = "0";
    }
  }

  get getResponse() {
    return (
      this.ufr0Response +
      "\n" +
      this.ufr1Response +
      "\n" +
      this.ufr2Response +
      "\n" +
      this.ufr3Response
    );
  }

  addPause(readerNumber: number, response: string) {
    if (readerNumber == 0) {
      if (this.ufr0Response == "0") {
        this.ufr0Response = response;
      } else {
        this.ufr0Response += " ";
        this.ufr0Response += response;
      }
    } else if (readerNumber == 1) {
      if (this.ufr1Response == "0") {
        this.ufr1Response = response;
      } else {
        this.ufr1Response += " ";
        this.ufr1Response += response;
      }
    } else if (readerNumber == 2) {
      if (this.ufr2Response == "0") {
        this.ufr2Response = response;
      } else {
        this.ufr2Response += " ";
        this.ufr2Response += response;
      }
    } else if (readerNumber == 3) {
      if (this.ufr3Response == "0") {
        this.ufr3Response = response;
      } else {
        this.ufr3Response += " ";
        this.ufr3Response += response;
      }
    }
  }

  byteArray2Hex(byteArray: number[]) {
    var s = "";
    byteArray.forEach(function (byte) {
      s += ("0" + (byte & 0xff).toString(16)).slice(-2);
    });
    return s;
  }

  calculateChecksum(data: number[], len: number) {
    var checksum = 0;
    for (var x = 0; x < len; x++) {
      checksum ^= data[x];
    }
    return (checksum + 7) & 0xff;
  }

  addResponse(readerNumber: number, response: number[]) {
    if (readerNumber == 0) {
      if (this.ufr0Response == "0") {
        this.ufr0Response = this.byteArray2Hex(response);
      } else {
        this.ufr0Response += " ";
        this.ufr0Response += this.byteArray2Hex(response);
      }
    } else if (readerNumber == 1) {
      if (this.ufr1Response == "0") {
        this.ufr1Response = this.byteArray2Hex(response);
      } else {
        this.ufr1Response += " ";
        this.ufr1Response += this.byteArray2Hex(response);
      }
    } else if (readerNumber == 2) {
      if (this.ufr2Response == "0") {
        this.ufr2Response = this.byteArray2Hex(response);
      } else {
        this.ufr2Response += " ";
        this.ufr2Response += this.byteArray2Hex(response);
      }
    } else if (readerNumber == 3) {
      if (this.ufr3Response == "0") {
        this.ufr3Response = this.byteArray2Hex(response);
      } else {
        this.ufr3Response += " ";
        this.ufr3Response += this.byteArray2Hex(response);
      }
    }
  }

  get getSerialNumber() {
    return this.serialNumber;
  }

  get getOnlineSerialNumber() {
    return this.onlineSerialNumber;
  }

  get getCardId() {
    return this.cardId;
  }

  get getReader() {
    return this.reader;
  }

  get getData() {
    return this.data;
  }

  readerUISignal(readerNumber: number, light: number, beep: number) {
    var data = [0x55, 0x26, 0xaa, 0x00, 0xff, 0xff, 0xff];
    data[4] = light;
    data[5] = beep;
    data[6] = this.calculateChecksum(data, 6);
    this.addResponse(readerNumber, data);
    return 1;
  }
  setTemplate(readerNumber: number, template: number) {
    var data = [0x55, 0x26, 0xaa, 0x00, 0xff, 0xff, 0xff];
    data[4] = template;
    data[5] = 0;
    data[6] = this.calculateChecksum(data, 6);
    this.addResponse(readerNumber, data);
    return 1;
  }
  lockOpen(readerNumber: number, lockNumber: number, duration: number) {
    var data = [0x55, 0x60, 0xaa, 0x00, 0xff, 0xff, 0xff];
    data[4] = duration & 0xff;
    if (lockNumber == 1) {
      data[5] = duration >> 8;
    } else {
      data[5] = (duration >> 8) | 0x80;
    }
    data[6] = this.calculateChecksum(data, 6);
    this.addResponse(readerNumber, data);
    return 1;
  }
  dlioOpen(readerNumber: number, lockNumber: number) {
    var data = [0x55, 0x5f, 0xaa, 0x03, 0x01, 0x00, 0xa9];
    data[7] = lockNumber & 0xff;
    data[8] = lockNumber >> 8;
    data[9] = (data[7] ^ data[8]) + 0x07;
    this.addResponse(readerNumber, data);
    return 1;
  }
  ledRingRGB(readerNumber: number, red: number, green: number, blue: number) {
    var data = [0x55, 0x72, 0xaa, 0x49, 0x48, 0x00, 0x93];
    for (var x = 0; x < 72; x += 3) {
      data[x + 7] = green;
      data[x + 8] = red;
      data[x + 9] = blue;
    }
    data[79] = 0x07;
    this.addResponse(readerNumber, data);
    return 1;
  }
  ledRingArray(readerNumber: number, array: number[]) {
    var data = [0x55, 0x72, 0xaa, 0x49, 0x48, 0x00, 0x93];
    for (var x = 0; x < 72; x++) {
      data[x + 7] = array[x];
    }
    data[79] = this.calculateChecksum(array, 72);
    this.addResponse(readerNumber, data);
    return 1;
  }
  onlineRGB(
    readerNumber: number,
    red: number,
    green: number,
    blue: number,
    duration: number
  ) {
    var data = [0x55, 0xf8, 0xaa, 0x07, 0x00, 0x00, 0x07];
    data[4] = duration & 0xff;
    data[5] = duration >> 8;
    data[6] = this.calculateChecksum(data, 6);
    for (var x = 0; x < 6; x += 3) {
      data[x + 7] = red;
      data[x + 8] = green;
      data[x + 9] = blue;
    }
    data[13] = 0x07;
    this.addResponse(readerNumber, data);
    return 1;
  }
  onlineRGBDual(
    readerNumber: number,
    red: number,
    green: number,
    blue: number,
    red1: number,
    green1: number,
    blue1: number,
    duration: number
  ) {
    var data = [0x55, 0xf8, 0xaa, 0x07, 0x00, 0x00, 0x07];
    data[4] = duration & 0xff;
    data[5] = duration >> 8;
    data[6] = this.calculateChecksum(data, 6);
    data[7] = red;
    data[8] = green;
    data[9] = blue;
    data[10] = red1;
    data[11] = green1;
    data[12] = blue1;
    data[13] = 0x07;
    this.addResponse(readerNumber, data);
    return 1;
  }

  gpioControl(readerNumber: number, gpio: number, state: number) {
    var data = [0x55, 0xf3, 0xaa, 0x00, 0xff, 0xff, 0xff];
    data[4] = gpio;
    data[5] = state;
    data[6] = this.calculateChecksum(data, 6);
    this.addResponse(readerNumber, data);
    return 1;
  }

  blinkingControl(readerNumber: number, state: number) {
    var data = [0x55, 0x6e, 0xaa, 0x00, 0x00, 0x00, 0xff];
    data[4] = state;
    data[6] = this.calculateChecksum(data, 6);
    this.addResponse(readerNumber, data);
    if (state == 1) {
      this.readerUISignal(readerNumber, 0, 0);
    }
    return 1;
  }

  pause(readerNumber: number, duration: number) {
    this.addPause(readerNumber, "P" + duration);
    return 1;
  }
}
