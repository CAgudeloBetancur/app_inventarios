import mongoose from "mongoose";

export const getConnection = async () => {

  try {

    // const url = "mongodb+srv://iud_user:RmDJxcmlHfwwjWH1@universidad.rs344pt.mongodb.net/app_inventarios_db?retryWrites=true&w=majority";

    const url = "mongodb://iud_user:RmDJxcmlHfwwjWH1@ac-fvifizb-shard-00-00.rs344pt.mongodb.net:27017,ac-fvifizb-shard-00-01.rs344pt.mongodb.net:27017,ac-fvifizb-shard-00-02.rs344pt.mongodb.net:27017/app_inventarios_db?ssl=true&replicaSet=atlas-d9x873-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Universidad";

    await mongoose.connect(url);

    console.log("conexión exitosa");

  } catch (error) {

    console.log(error);

  }

}