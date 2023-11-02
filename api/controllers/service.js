const db = require('../database/index');

module.exports = {
  addServiceToUser: async (req, res) => {
    const { userId } = req.params;
    const { title, category, description, deliveryTime, features1, features2, price } = req.body;
    console.log("this is the userid",userId)
    const user = await db.user.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    try {
      const service = await db.service.create({
        title,
        category,
        description,
        deliveryTime,
        features1,
        features2,
        price,
        userId
      });
      
      res.status(201).json(service);
    } catch (error) {
      console.log(error);
      res.status(500).send('An error occurred');
    }
  },
};
