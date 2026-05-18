import { useState } from 'react'
import axios from 'axios'

function App() {

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const [prediction, setPrediction] = useState('')
  const [confidence, setConfidence] = useState('')

  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {

    const file = e.target.files[0]

    setImage(file)

    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async () => {

    if (!image) {
      alert("Please upload image")
      return
    }

    const formData = new FormData()

    formData.append('file', image)

    try {

      setLoading(true)

      const response = await axios.post(
        'http://127.0.0.1:5000/predict',
        formData
      )

      setPrediction(response.data.prediction)

      setConfidence(
        (response.data.confidence * 100).toFixed(2)
      )

      setLoading(false)

    }

    catch (error) {

      console.log(error)

      alert("Prediction failed")

      setLoading(false)
    }
  }

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          🌿 Plant Disease Detection
        </h1>

        <p style={styles.subtitle}>
          Upload a plant leaf image and detect disease using AI
        </p>

        <input
          type="file"
          onChange={handleImageChange}
          style={styles.input}
        />

        {
          preview && (
            <img
              src={preview}
              alt="preview"
              style={styles.image}
            />
          )
        }

        <button
          onClick={handleSubmit}
          style={styles.button}
        >
          {
            loading
              ? "Predicting..."
              : "Predict Disease"
          }
        </button>

        {
          prediction && (
            <div style={styles.resultBox}>

              <h2>
                Prediction:
              </h2>

              <p style={styles.prediction}>
                {prediction}
              </p>

              <h3>
                Confidence:
              </h3>

              <p style={styles.confidence}>
                {confidence}%
              </p>

            </div>
          )
        }

      </div>

    </div>
  )
}

const styles = {

  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#e8f5e9',
    fontFamily: 'Arial'
  },

  card: {
    background: 'white',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    width: '400px',
    textAlign: 'center'
  },

  title: {
    color: '#2e7d32',
    marginBottom: '10px'
  },

  subtitle: {
    color: '#555',
    marginBottom: '20px'
  },

  input: {
    marginBottom: '20px'
  },

  image: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '20px'
  },

  button: {
    background: '#2e7d32',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%'
  },

  resultBox: {
    marginTop: '25px',
    padding: '20px',
    background: '#f1f8e9',
    borderRadius: '10px'
  },

  prediction: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1b5e20'
  },

  confidence: {
    fontSize: '18px',
    color: '#33691e'
  }
}

export default App