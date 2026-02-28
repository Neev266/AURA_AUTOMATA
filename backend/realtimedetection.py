import cv2
import numpy as np
from tensorflow.keras.models import model_from_json
from collections import deque


def start_camera():

    print("Starting Real-Time Emotion Engine...")

    # Load model
    with open("models/facialemotionmodel.json", "r") as json_file:
        model_json = json_file.read()

    model = model_from_json(model_json)
    model.load_weights("models/facialemotionmodel.h5")

    print("Real-Time Model Loaded Successfully!")

    # Load face cascade
    haar_file = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
    face_cascade = cv2.CascadeClassifier(haar_file)

    labels = {
        0: "angry",
        1: "disgust",
        2: "fear",
        3: "happy",
        4: "neutral",
        5: "sad",
        6: "surprise",
    }

    emotion_history = deque(maxlen=5)

    def extract_features(image):
        image = np.array(image)
        image = image.reshape(1, 48, 48, 1)
        return image / 255.0

    def calculate_stress(pred_probs):
        angry = pred_probs[0]
        fear = pred_probs[2]
        sad = pred_probs[5]
        disgust = pred_probs[1]
        return int((angry + fear + sad + disgust) * 100)

    webcam = cv2.VideoCapture(0)

    if not webcam.isOpened():
        print("ERROR: Camera not accessible")
        return

    while True:
        ret, frame = webcam.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=4,
            minSize=(30, 30)
        )

        for (x, y, w, h) in faces:
            face = gray[y:y+h, x:x+w]
            face = cv2.resize(face, (48, 48))

            img = extract_features(face)
            prediction = model.predict(img, verbose=0)[0]

            dominant_index = np.argmax(prediction)
            dominant_emotion = labels[dominant_index]
            confidence = prediction[dominant_index] * 100
            stress_score = calculate_stress(prediction)

            text = f"{dominant_emotion} | {int(confidence)}% | Stress:{stress_score}"

            cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
            cv2.putText(
                frame,
                text,
                (x, y - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                (0, 0, 255),
                2,
            )

        cv2.imshow("AURA Real-Time Emotion Engine", frame)

        if cv2.waitKey(1) & 0xFF == 27:
            break

    webcam.release()
    cv2.destroyAllWindows()