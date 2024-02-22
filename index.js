import express from "express";
import mysql from "mysql";
import cors from "cors";
import moment from "moment"; 

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "todo_db",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.post("/items", (req, res) => {
  const q =
    "INSERT INTO items (taskname, taskprogress, starttime, endtime) VALUES (?, ?, ?, ?)";

  // Parse the start time and end time using moment
  const startTime = moment(req.body.starttime, "hh:mm A").format("HH:mm:ss");
  const endTime = moment(req.body.endtime, "hh:mm A").format("HH:mm:ss");

  const values = [
    req.body.taskname,
    req.body.taskprogress,
    startTime,  // <-- Corrected variable name
    endTime,    // <-- Corrected variable name
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error adding item to the database" });
    }

    return res.status(201).json({ message: "Item added successfully" });
  });
});


app.get("/items", (req, res) => {
  const q = "SELECT * FROM items";

  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error fetching items from the database" });
    }

    // Format the time to AM/PM
    const formattedData = data.map((item) => {
      return {
        ...item,
        starttime: moment(item.starttime, "HH:mm:ss").format("hh:mm A"),
        endtime: moment(item.endtime, "HH:mm:ss").format("hh:mm A"),
      };
    });

    return res.json(formattedData);
  });
});


app.get("/items/:id", (req, res) => {
  const itemId = req.params.id;
  const q = "SELECT * FROM items WHERE id=?";

  db.query(q, [itemId], (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error fetching item from the database" });
    }
    const formattedData = data.map((item) => {
      return {
        ...item,
        starttime: moment(item.starttime, "HH:mm:ss").format("hh:mm A"),
        endtime: moment(item.endtime, "HH:mm:ss").format("hh:mm A"),
      };
    });

    if (data.length === 0) {
      return res.status(404).json("Item not found");
    }

    return res.json(data[0]);
  });
});

app.delete("/items/:id", (req, res) => {
  const itemId = req.params.id;

  // Delete the item
  const deleteQuery = "DELETE FROM items WHERE id=?";
  db.query(deleteQuery, [itemId], (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error deleting item from the database" });
    }

    // Check if all data is deleted
    const checkAllDataDeletedQuery = "SELECT COUNT(*) AS count FROM items";
    db.query(checkAllDataDeletedQuery, (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Error checking if all data is deleted" });
      }

      const count = result[0].count;

      if (count === 0) {
        // If all data is deleted, reset auto-increment to 1
        const resetAutoIncrementQuery = "ALTER TABLE items AUTO_INCREMENT = 1";
        db.query(resetAutoIncrementQuery, (err, data) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .json({ error: "Error resetting auto-increment value" });
          }
          return res.json(
            "Deleted all data, and reset auto-increment to 1"
          );
        });
      } else {
        // If a specific ID is deleted, get the current maximum ID and set auto-increment accordingly
        const getMaxIdQuery = "SELECT MAX(id) AS maxId FROM items";
        db.query(getMaxIdQuery, (err, result) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .json({ error: "Error getting maximum ID from the database" });
          }

          const maxId = result[0].maxId;

          const setAutoIncrementQuery = `ALTER TABLE items AUTO_INCREMENT = ${maxId + 1}`;
          db.query(setAutoIncrementQuery, (err, data) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .json({ error: "Error setting auto-increment value" });
            }
            return res.json(
              `Deleted item with ID ${itemId}, and reset auto-increment to ${maxId + 1}`
            );
          });
        });
      }
    });
  });
});

// New route to delete all items
app.delete("/items", (req, res) => {
  // Delete all items
  const deleteAllQuery = "DELETE FROM items";
  db.query(deleteAllQuery, (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error deleting all items from the database" });
    }

    // Reset auto-increment to 1 after deleting all data
    const resetAutoIncrementQuery = "ALTER TABLE items AUTO_INCREMENT = 1";
    db.query(resetAutoIncrementQuery, (err, data) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Error resetting auto-increment value" });
      }
      return res.json("Deleted all items, and reset auto-increment to 1");
    });
  });
});

  

app.put("/items/:id", (req, res) => {
  const itemId = req.params.id;
  console.log("Received itemId:", itemId); 

  const q =
  "UPDATE items SET taskname=?, taskprogress=?, starttime=?, endtime=? WHERE id=?";

  const startTime = moment(req.body.starttime, "hh:mm A").format("HH:mm:ss");
  const endTime = moment(req.body.endtime, "hh:mm A").format("HH:mm:ss");

  const values = [
    req.body.taskname,
    req.body.taskprogress,
    startTime, // Use the formatted startTime
    endTime,   // Use the formatted endTime
    itemId,
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error updating item in the database" });
    }

    return res.json("Updated successfully");
  });
});


const port = 8800;
app.listen(port, () => {
  console.log('Connected to the Backend!');
});
