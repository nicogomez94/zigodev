const TABS = {
  inmobiliarias: 'Inmobiliarias',
  comercios: 'Comercios y servicios',
  sistemas: 'Sistemas para pymes',
  webs: 'Webs para pymes',
  ecommerce: 'E-commerce'
};

function doPost(event) {
  const lock = LockService.getScriptLock();
  try {
    const data = JSON.parse(event.postData.contents);
    if (!Object.prototype.hasOwnProperty.call(TABS, data.vertical)) throw new Error('Vertical inválida');
    if (!/^ZD-[A-F0-9]{8}$/.test(data.id)) throw new Error('ID inválido');
    if (!Array.isArray(data.answers) || data.answers.length < 1) throw new Error('Sin respuestas');

    lock.waitLock(10000);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TABS[data.vertical]);
    const lastRow = sheet.getLastRow();
    const match = lastRow > 1
      ? sheet.getRange(2, 1, lastRow - 1, 1).createTextFinder(data.id).matchEntireCell(true).findNext()
      : null;
    const row = match ? match.getRow() : lastRow + 1;
    const previous = match ? sheet.getRange(row, 1, 1, 17).getValues()[0] : Array(17).fill('');
    const version = Math.max(0, Math.floor(Number(data.version) || 0));
    if (version <= Number(previous[16] || 0)) return response_('ignored');

    const now = new Date();
    const contact = data.contact || {};
    const answers = data.answers.slice(0, 6).map(value => safeCell_(value));
    while (answers.length < 6) answers.push('');
    const answered = answers.filter(Boolean).length;
    const status = data.openedWhatsApp ? 'WhatsApp abierto'
      : data.stage === 'review' ? 'Listo para WhatsApp'
      : Object.values(contact).some(Boolean) ? 'Ingresando contacto'
      : 'En curso';
    const values = [
      data.id, previous[1] || now, now, status, Math.max(Number(previous[4]) || 0, answered),
      safeCell_(contact.nombre), safeCell_(contact.negocio),
      safeCell_(contact.whatsapp), safeCell_(contact.presencia), ...answers,
      data.openedWhatsApp ? 'Sí' : 'No', version
    ];
    sheet.getRange(row, 1, 1, 17).setValues([values]);
    return response_('ok');
  } catch (error) {
    return response_('error: ' + error.message);
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function safeCell_(value) {
  const text = String(value || '').trim().slice(0, 200);
  return /^[=+@-]/.test(text) ? "'" + text : text;
}

function response_(message) {
  return ContentService.createTextOutput(JSON.stringify({ status: message }))
    .setMimeType(ContentService.MimeType.JSON);
}
