const stripe = require("stripe")(process.env.STRIPE_SECRET);
const url = process.env.BASE_URL;

//Generating items list
const genItem = async (p) => {
  try {
    let item = [];
    for (var i = 0; i < p.length; i++) {
      let product = await stripe.products.create({
        name: p[i].productId.name,
        images: [p[i].productId.image],
      });
      let price = await stripe.prices.create({
        product: product.id,
        unit_amount: p[i].productId.price * 100,
        currency: "inr",
      });
      item = [...item, { price: price.id, quantity: p[i].quantity }];
    }
    return item;
  } catch (err) {
    throw err;
  }
};

//Create checkout session
const checkout = async (req, res) => {
  try {
    const { order } = req.body;

    let item = await genItem(order.products);
    const session = await stripe.checkout.sessions.create({
      client_reference_id: order._id,
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${url}/paysuccess`,
      cancel_url: `${url}/userallorders`,
      line_items: item,
    });

    res.json({ order_id: order._id, session_id: session.id });
  } catch (err) {
    throw err;
  }
};

module.exports = { checkout };
