const adminSettingService = require('#services/admin/admin.setting.service');

const getSettings = async (req, res) => {
  try {
    const settings = await adminSettingService.getSettingsService();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const updatedSettings = await adminSettingService.updateSettingsService(req.body);
    res.json(updatedSettings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getSettings,
  updateSettings
};
