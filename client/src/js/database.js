import { openDB } from "idb";

const dbName = "jate";
const dbVersion = 1;
const objectStoreName = "jate";

const initdb = async () =>
  openDB(dbName, dbVersion, {
    upgrade(db) {
      if (db.objectStoreNames.contains(objectStoreName)) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore(objectStoreName, {
        keyPath: "id",
        autoIncrement: true,
      });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB(dbName, dbVersion);
  const tx = await db.transaction(objectStoreName, "readwrite");
  const store = await tx.objectStore(objectStoreName);

  const result = await store.add(content);
  return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB(dbName, dbVersion);
  const tx = await db.transaction(objectStoreName, "readonly");
  const store = await tx.objectStore(objectStoreName);

  const results = await store.getAll();
  return results;
};

initdb();
