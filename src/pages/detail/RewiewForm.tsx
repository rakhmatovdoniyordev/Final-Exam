import type React from "react"
import { useState } from "react"
import { TextField, Rating, Button } from "@mui/material"
import { IComment } from "../../types"

interface ReviewFormProps {

    handleClose: () => void

    onSubmit: (review: Omit<IComment, "id" | "createdAt">) => void

    updatedComment: string

    setUpdatedComment: React.Dispatch<React.SetStateAction<string>>

    selectedComment: IComment | null

    setSelectedComment: React.Dispatch<React.SetStateAction<IComment | null>>

  }


const ReviewForm: React.FC<ReviewFormProps> = ({ handleClose, onSubmit }) => {
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && comment && rating) {
      const clotheId = "someClotheId";
      onSubmit({ name, comment, star: rating, clotheId })
      handleClose()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Your Review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        margin="normal"
        multiline
        rows={4}
        required
      />
      <Rating name="rating" value={rating} onChange={(_, newValue) => setRating(newValue)} precision={0.5} />
      <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
        Submit Review
      </Button>
    </form>
  )
}

export default ReviewForm
