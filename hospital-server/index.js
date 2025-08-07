const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.evn2ej1.mongodb.net/?retryWrites=true&w=majority`;

// const uri =
//   'mongodb+srv://hospital:jMyaf0pHB80jm38d@cluster0.1qeesru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';




const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();

    const userCollection = client.db('hospital2').collection('user');
    const appointmentCollection = client
      .db('hospital2')
      .collection('appointments');

    const bookingCollection = client.db('hospital2').collection('bookings');
    const updateCollection = client.db('hospital2').collection('update');
    const contactCollection = client.db('hospital2').collection('contacts');
    const aboutCollection = client.db('hospital2').collection('about');
    const donnerCollection = client.db('hospital2').collection('donner');

    // // // // // // // // // // // //

    //  *********  User  ********//

    // create and update a user
    app.put('/create-user/:email', async (req, res) => {
      const email = req.params.email;
      const user = req.body;

      const filter = { email: email };
      const options = { upsert: true };

      const updatedDoc = {
        $set: user,
      };

      const result = await userCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
    // get all users from db
    app.get('/users', async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    // all User filter by email category
    app.get('/user/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const cursor = userCollection.find(query);
      const user = await cursor.toArray();
      res.send(user);
    });
    // add admin
    app.put('/admin/:id', async (req, res) => {
      const id = req.params.id;
      const updateAdmin = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          admin: updateAdmin.admin,
        },
      };
      const result = await userCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    // // //  *********  appointments  ********//

    // // get appointments to query multiple collection  and them marge data
    app.get('/appointments', async (req, res) => {
      const { date, department } = req.query;
      const query = {}; // Your initial query conditions

      if (department) {
        query.department = department; // Add department filter to the query
      }

      const options = await appointmentCollection.find(query).toArray();
      const bookingQuery = { appointmentDate: date };
      const alreadyBooked = await bookingCollection
        .find(bookingQuery)
        .toArray();

      options.forEach(option => {
        const optionBooked = alreadyBooked.filter(
          book => book.doctorName === option.name
        );
        const bookedSlots = optionBooked.map(book => book.slot);
        const remainingSlots = option.slots.filter(
          slot => !bookedSlots.includes(slot)
        );
        option.slots = remainingSlots;
      });

      res.send(options);
    });

    // Post appointments
    app.post('/appointments2', async (req, res) => {
      const appointmentsBook = req.body;
      const result = await appointmentCollection.insertOne(appointmentsBook);
      res.send(result);
    });
    // get doctor
    app.get('/doctor', async (req, res) => {
      const query = {};
      const cursor = appointmentCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    // get doctor by id
    app.get('/doctor/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await appointmentCollection.findOne(query);
      res.send(result);
    });
    // update doctor
    app.put('/updateDoctor/:id', async (req, res) => {
      const productId = req.params.id;
      const updateDoctor = req.body;

      const filter = { _id: ObjectId(productId) }; // Assuming you're using MongoDB ObjectId
      const options = { upsert: true };

      const updatedDoc = {
        $set: updateDoctor,
      };

      try {
        const result = await appointmentCollection.updateOne(
          filter,
          updatedDoc,
          options
        );
        res.json({
          success: true,
          message: 'DOctor updated successfully',
          data: result,
        });
      } catch (error) {
        console.error('Error updating DOctor:', error);
        res
          .status(500)
          .json({ success: false, message: 'Internal server error' });
      }
    });
    //  Booking filter by department
    app.get('/doctorDepartment/:department', async (req, res) => {
      const department = req.params.department;
      const query = { department };
      const cursor = appointmentCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // Delete one contact
    app.delete('/doctorDelete/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await appointmentCollection.deleteOne(query);
      res.send(result);
    });
    // post Booking/ terminal
    app.post('/bookings', async (req, res) => {
      const newBooking = req.body;
      const result = await bookingCollection.insertOne(newBooking);
      res.send(result);
    });
    // get Booking/terminal
    app.get('/bookings', async (req, res) => {
      const query = {};
      const cursor = bookingCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    // bookings filter by email
    app.get('/myBookings/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const cursor = bookingCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    //  Booking filter by Division
    app.get('/bookingDate/:date', async (req, res) => {
      const date = req.params.date;
      const query = { date };
      const cursor = bookingCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    //  update payment buy
    app.put('/buyPayment/:id', async (req, res) => {
      const id = req.params.id;
      const updatePayment = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          payment: updatePayment.payment,
        },
      };
      const result = await bookingCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });
    //  update next date
    app.put('/nextDate/:id', async (req, res) => {
      const id = req.params.id;
      const updateNextDate = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          nextDate: updateNextDate.nextDate,
        },
      };
      const result = await bookingCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });
    //  update complete buy
    app.put('/bookingComplete/:id', async (req, res) => {
      const id = req.params.id;
      const updateComplete = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          complete: updateComplete.complete,
        },
      };
      const result = await bookingCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });
    //  update complete buy
    app.put('/bookingAccept/:id', async (req, res) => {
      const id = req.params.id;
      const updateAccept = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          accept: updateAccept.accept,
        },
      };
      const result = await bookingCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });
    // Delete one Booking Terminal
    app.delete('/bookings/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await bookingCollection.deleteOne(query);
      res.send(result);
    });

    // post donnerCollection
    app.post('/donner', async (req, res) => {
      const newBooking = req.body;
      const result = await donnerCollection.insertOne(newBooking);
      res.send(result);
    });
    // get donnerCollection
    app.get('/donner', async (req, res) => {
      const query = {};
      const cursor = donnerCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    // Delete one donnerCollection
    app.delete('/donner/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await donnerCollection.deleteOne(query);
      res.send(result);
    });
    // post Contact
    app.post('/contact', async (req, res) => {
      const newBooking = req.body;
      const result = await contactCollection.insertOne(newBooking);
      res.send(result);
    });
    // get contact
    app.get('/contact', async (req, res) => {
      const query = {};
      const cursor = contactCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    // Delete one contact
    app.delete('/contacts/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await contactCollection.deleteOne(query);
      res.send(result);
    });

    // get update
    app.get('/update', async (req, res) => {
      const query = {};
      const cursor = updateCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    // update update
    const { ObjectId } = require('mongodb');

    app.put('/updateDescription/:id', async (req, res) => {
      const productId = req.params.id;
      const updateDescription = req.body; // e.g., { description: "new value" }

      const filter = { _id: new ObjectId(productId) };
      const options = { upsert: false };

      const updatedDoc = {
        $set: updateDescription,
      };

      try {
        const result = await updateCollection.updateOne(
          filter,
          updatedDoc,
          options
        );
        res.json({
          success: true,
          message: 'Description updated successfully',
          data: result,
        });
      } catch (error) {
        console.error('Error updating description:', error);
        res
          .status(500)
          .json({ success: false, message: 'Internal server error' });
      }
    });

    // About
    // get about

    app.get('/about', async (req, res) => {
      const query = {};
      const cursor = aboutCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    // update about
    app.put('/updateAbout/:id', async (req, res) => {
      const productId = req.params.id;
      const updateAbout = req.body;

      try {
        const filter = { _id: new ObjectId(productId) };
        const options = { upsert: false }; // Don't create new if not found

        const updatedDoc = {
          $set: updateAbout,
        };

        const result = await aboutCollection.updateOne(
          filter,
          updatedDoc,
          options
        );

        res.json({
          success: true,
          message: 'About section updated successfully',
          modifiedCount: result.modifiedCount,
        });
      } catch (error) {
        console.error('Error updating About:', error);
        res
          .status(500)
          .json({ success: false, message: 'Internal server error' });
      }
    });
  } finally {
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Running Hospital ');
});

app.listen(port, () => {
  console.log('Hospital  server is running ');
});
