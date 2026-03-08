import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const storage = getStorage();
const db = getFirestore();

window.subirALaComunidad = async () => {
    const file = document.getElementById('audio-input').files[0];
    const trackName = document.getElementById('track-name').value;
    const user = localStorage.getItem('aka_user') || "Productor Desconocido";

    if(!file) return alert("Selecciona un audio");

    // 1. Subir el archivo a Storage
    const storageRef = ref(storage, 'comunidad/' + Date.now() + "_" + file.name);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    // 2. Crear el post en el Feed (Firestore)
    await addDoc(collection(db, "posts"), {
        username: user,
        track: trackName,
        audioUrl: downloadURL,
        timestamp: Date.now()
    });

    alert("¡Track compartido con la comunidad!");
};
