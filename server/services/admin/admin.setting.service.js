const Setting = require('#models/misc/misc.setting.model');

const getSettingsService = async () => {
  let settings = await Setting.findOne();
  if (!settings) {
    settings = await Setting.create({});
  }
  return settings;
};

const updateSettingsService = async (updateData) => {
  let settings = await Setting.findOne();
  if (!settings) {
    settings = await Setting.create({});
  }
  
  if (updateData.storeSettings) {
    const incoming = updateData.storeSettings;
    
    if (incoming.storeName !== undefined) settings.storeSettings.storeName = incoming.storeName;
    if (incoming.storeEmail !== undefined) settings.storeSettings.storeEmail = incoming.storeEmail;
    if (incoming.storePhone !== undefined) settings.storeSettings.storePhone = incoming.storePhone;
    if (incoming.currency !== undefined) settings.storeSettings.currency = incoming.currency;
    if (incoming.freeShippingThreshold !== undefined) settings.storeSettings.freeShippingThreshold = incoming.freeShippingThreshold;
    if (incoming.taxRate !== undefined) settings.storeSettings.taxRate = incoming.taxRate;

    if (incoming.exchangeRates) {
      const ratesMap = settings.storeSettings.exchangeRates || new Map();
      for (const [key, value] of Object.entries(incoming.exchangeRates)) {
        ratesMap.set(key, Number(value));
      }
      settings.storeSettings.exchangeRates = ratesMap;
    }

    settings.markModified('storeSettings');
  }
  if (updateData.appearance) {
    settings.appearance = { ...settings.toObject().appearance, ...updateData.appearance };
    settings.markModified('appearance');
  }
  if (updateData.notifications) {
    settings.notifications = { ...settings.toObject().notifications, ...updateData.notifications };
    settings.markModified('notifications');
  }
  
  return await settings.save();
};

module.exports = {
  getSettingsService,
  updateSettingsService
};
