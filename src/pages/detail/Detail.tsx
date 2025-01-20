import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { FaAngleRight } from "react-icons/fa"
import { ImageGallery } from "../../components/Swiper/Swiper"
import { BiCheck, BiMinus, BiPlus } from "react-icons/bi"
import { useEffect, useState } from "react"
import { Backdrop, Box, Fade, Modal, Skeleton, Stack, Menu, MenuItem, TextField, Button } from "@mui/material"
import ProductRating from "../../components/Rating/ProductRating"
import { GiSettingsKnobs } from "react-icons/gi"
import { RiDeleteBin5Fill, RiMoreFill } from "react-icons/ri"
import { FaCircleCheck } from "react-icons/fa6"
import type { IComment } from "../../types"
import { format } from "date-fns"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from "../../redux/cartSlice"
import type { RootState } from "../../redux/store"
import toast from "react-hot-toast"
import ReviewForm from "./RewiewForm"
import { ModeEdit } from "@mui/icons-material"

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

export interface Color {
  id: number
  name: string
  value: string
}

const colors: Color[] = [
  { id: 1, name: "Black", value: "bg-black" },
  { id: 2, name: "White", value: "bg-white border border-gray-200" },
  { id: 3, name: "Red", value: "bg-red-600" },
]

interface UpdateModalProps {
  open: boolean
  handleClose: () => void
  comment: IComment | null
  onUpdate: (comment: IComment) => void
}

const UpdateModal = ({ open, handleClose, comment, onUpdate }: UpdateModalProps) => {
  const [updatedComment, setUpdatedComment] = useState(comment?.comment || "")
  const [updatedName, setUpdatedName] = useState(comment?.name || "")
  const [updatedRating, setUpdatedRating] = useState(comment?.star || 0)

  useEffect(() => {
    if (comment) {
      setUpdatedComment(comment.comment)
      setUpdatedName(comment.name)
      setUpdatedRating(comment.star)
    }
  }, [comment])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (comment?.id) {
      onUpdate({ ...comment, comment: updatedComment, name: updatedName, star: updatedRating })
    }
    handleClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 4,
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Rating"
            type="number"
            InputProps={{ inputProps: { min: 1, max: 5 } }}
            value={updatedRating}
            onChange={(e) => setUpdatedRating(Number(e.target.value))}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Comment"
            value={updatedComment}
            onChange={(e) => setUpdatedComment(e.target.value)}
            margin="normal"
          />
          <div className="w-full flex justify-center">
            <Button type="submit" variant="contained" color="success" className="">
              Update Comment
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  )
}

const Detail = () => {
  const [sortOption, setSortOption] = useState<string>("Latest")
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [selectedColor, setSelectedColor] = useState<number>(1)
  const [open, setOpen] = useState(false)
  const [selectedComment, setSelectedComment] = useState<IComment | null>(null)
  const [updatedComment, setUpdatedComment] = useState<string>("")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [updateModalOpen, setUpdateModalOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleUpdateClose = () => {
    setUpdateModalOpen(false)
    setSelectedComment(null)
  }
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    data,
    isLoading,
  }: {
    isLoading: boolean
    data?: {
      id: string
      size: number[]
      title: string
      star: number
      price: number
      urls: string[]
    }
  } = useQuery({
    queryKey: ["detail", id],
    queryFn: async () => {
      const response = await axios.get(`https://6777b7b280a79bf91902b4ff.mockapi.io/clothes/${id}`)
      return response.data
    },
  })

  const { data: comments, isLoading: isCommentsLoading } = useQuery<IComment[]>({
    queryKey: ["comments", id],
    queryFn: async () => {
      const response = await axios.get(`https://6777b7b280a79bf91902b4ff.mockapi.io/clothes/${id}/comments`)
      return response.data
    },
  })

  const addReviewMutation = useMutation({
    mutationFn: (newReview: Omit<IComment, "id" | "createdAt">) => {
      return axios.post(`https://6777b7b280a79bf91902b4ff.mockapi.io/clothes/${id}/comments`, {
        ...newReview,
        createdAt: new Date().toISOString(),
      })
    },
    onSuccess: () => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["comments", id] })
      }
      handleClose()
      toast.success("Review submitted successfully!")
    },
    onError: () => {
      toast.error("Failed to submit review. Please try again.")
    },
  })

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => {
      return axios.delete(`https://6777b7b280a79bf91902b4ff.mockapi.io/clothes/${id}/comments/${commentId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] })
      toast.success("Comment deleted successfully!")
    },
    onError: () => {
      toast.error("Failed to delete comment. Please try again.")
    },
  })

  const updateCommentMutation = useMutation({
    mutationFn: (updatedComment: IComment) => {
      return axios.put(
        `https://6777b7b280a79bf91902b4ff.mockapi.io/clothes/${id}/comments/${updatedComment.id}`,
        updatedComment,
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] })
      toast.success("Comment updated successfully!")
    },
    onError: () => {
      toast.error("Failed to update comment. Please try again.")
    },
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const formattedDate = (createdAt: string | undefined) => {
    if (!createdAt) {
      return "Invalid Date"
    }
    try {
      return format(new Date(createdAt), "MMMM d, yyyy")
    } catch (error) {
      return "Invalid Date"
    }
  }

  const cartItem = useSelector((state: RootState) => state.cart.items.find((item) => item.id === id))

  const handleReviewSubmit = (review: Omit<IComment, "id" | "createdAt">) => {
    addReviewMutation.mutate(review)
  }

  const handleUpdateOpen = (comment: IComment) => {
    setSelectedComment(comment)
    setUpdateModalOpen(true)
  }

  const handleUpdateComment = (updatedComment: IComment) => {
    updateCommentMutation.mutate(updatedComment)
  }

  return (
    <section>
      <div className="container">
        <div className="flex items-center gap-2 mt-6">
          <button onClick={() => navigate("/")} className="text-sm md:text-base hover:underline">
            Home
          </button>
          <p>
            <FaAngleRight />
          </p>
          <p>{isLoading ? <Skeleton width={120} /> : data?.title}</p>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-10 mt-10">
          {isLoading ? (
            <Skeleton variant="rectangular" className="w-full h-full lg:w-[400px] lg:h-[400px]" />
          ) : (
            <ImageGallery urls={data?.urls} loading={isCommentsLoading} />
          )}
          <div className="w-full lg:w-1/2">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              {isLoading ? <Skeleton width="60%" /> : data?.title}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <Stack spacing={1}>
                {isLoading ? (
                  <Skeleton width={150} />
                ) : (
                  data?.star !== undefined && <ProductRating product={{ star: data.star }} />
                )}
              </Stack>
              <span className="text-gray-600 text-sm md:text-base">
                {isLoading ? <Skeleton width={50} /> : `${data?.star}/5`}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xl md:text-3xl font-bold">
                {isLoading ? <Skeleton width={80} /> : `$${data?.price}`}
              </span>
            </div>
            <p className="text-gray-600 mb-8 text-sm md:text-base">
              {isLoading ? (
                <Skeleton width="90%" />
              ) : (
                "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style."
              )}
            </p>
            <div className="mb-8">
              <h2 className="text-sm md:text-lg font-semibold mb-3">Select Colors</h2>
              <div className="flex gap-3">
                {isLoading
                  ? [...Array(3)].map((_, idx) => <Skeleton key={idx} variant="circular" width={32} height={32} />)
                  : colors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color.id)}
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${color.value} flex items-center justify-center transition-all`}
                      >
                        {selectedColor === color.id && (
                          <BiCheck className={`w-5 h-5 ${color.name === "White" ? "text-black" : "text-white"}`} />
                        )}
                      </button>
                    ))}
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-sm md:text-lg font-semibold mb-3">Choose Size</h2>
              {isLoading ? (
                <Skeleton width="100%" height={40} />
              ) : (
                <div className="flex flex-wrap gap-3">
                  {data?.size.map((sizes) => (
                    <button
                      key={sizes}
                      onClick={() => setSelectedSize(sizes)}
                      className={`px-4 py-2 rounded-full transition-all text-sm md:text-base ${
                        selectedSize === sizes ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {sizes}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-4">
              {cartItem ? (
                <>
                  <div className="flex items-center bg-gray-100 rounded-full">
                    <button
                      className="w-8 md:w-10 h-8 md:h-10 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
                      onClick={() => id && dispatch(decrementQuantity(id))}
                      disabled={cartItem.quantity <= 1}
                    >
                      <BiMinus className="w-4 h-4" />
                    </button>
                    <span className="w-8 md:w-12 text-center text-sm md:text-base">{cartItem.quantity}</span>
                    <button
                      className="w-8 md:w-10 h-8 md:h-10 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
                      onClick={() => id && dispatch(incrementQuantity(id))}
                    >
                      <BiPlus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    className="flex-1 bg-red-500 text-white rounded-full py-2 md:py-3 hover:bg-red-600 transition-colors text-sm md:text-base"
                    onClick={() => {
                      id && dispatch(removeFromCart(id))
                      toast.error("Product removed from Cart :(")
                    }}
                  >
                    Remove from Cart
                  </button>
                </>
              ) : (
                <button
                  className="flex-1 bg-black text-white rounded-full py-2 md:py-3 hover:bg-gray-800 transition-colors disabled:bg-gray-300 text-sm md:text-base"
                  disabled={!selectedSize || isLoading}
                  onClick={() => {
                    if (data) {
                      const cartItem = {
                        ...data,
                        id: id as string,
                        name: data.title,
                        quantity: 1,
                        image: data.urls[0],
                        size: selectedSize,
                        price: data.price,
                      }
                      dispatch(addToCart(cartItem))
                      toast.success("Product added to Cart!")
                    }
                  }}
                >
                  {isLoading ? <Skeleton width="100%" /> : "Add to Cart"}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="text-lg font-semibold flex items-center justify-between">
            <p>
              All Reviews{" "}
              <span className="text-gray-500">
                {isCommentsLoading ? <Skeleton width={30} /> : `(${comments?.length})`}
              </span>
            </p>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full bg-[#F0F0F0] hover:bg-gray-100 transition w-[48px] h-[48px] flex justify-center items-center max-[580px]:w-[32px] max-[580px]:h-[32px] max-[580px]:hidden">
                <GiSettingsKnobs className="text-2xl" />
              </button>
              <div className="relative max-[580px]:hidden">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-gray-100 text-gray-700 text-sm font-medium rounded-full px-5 py-3 cursor-pointer focus:outline-none max-[580px]:px-2 max-[580px]:py-2"
                >
                  <option value="Latest">Latest</option>
                  <option value="Oldest">Oldest</option>
                  <option value="Highest Rated">Highest Rated</option>
                  <option value="Lowest Rated">Lowest Rated</option>
                </select>
              </div>
              <button
                className="bg-black text-white font-medium rounded-full px-7 py-3 hover:bg-gray-800 transition max-[580px]:px-2 max-[580px]:py-2"
                onClick={handleOpen}
              >
                Write a Review
              </button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Fade in={open}>
                  <Box sx={style}>
                    <ReviewForm
                      handleClose={handleClose}
                      onSubmit={handleReviewSubmit}
                      selectedComment={selectedComment}
                      setSelectedComment={setSelectedComment}
                      updatedComment={updatedComment}
                      setUpdatedComment={setUpdatedComment}
                    />
                  </Box>
                </Fade>
              </Modal>
              <UpdateModal
                open={updateModalOpen}
                handleClose={handleUpdateClose}
                comment={selectedComment}
                onUpdate={handleUpdateComment}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {isCommentsLoading
              ? [...Array(4)].map((_, idx) => <Skeleton key={idx} variant="rectangular" width="100%" height={150} />)
              : comments?.map((pro) => (
                  <div key={pro?.id} className="px-4 py-4 md:px-8 md:py-6 border rounded-3xl">
                    <div className="flex justify-between mb-4">
                      <ProductRating product={{ star: pro?.star }} />
                      <button
                        id={`more-button-${pro?.id}`}
                        className="text-3xl text-[#00000066]"
                        onClick={(event) => {
                          setAnchorEl(event.currentTarget)
                          setSelectedComment(pro)
                        }}
                      >
                        <RiMoreFill />
                      </button>
                    </div>
                    <p className="flex items-center gap-2 text-sm md:text-xl font-bold satoshi mb-3">
                      {pro?.name}{" "}
                      <span>
                        <FaCircleCheck className="text-green-500" />
                      </span>
                    </p>
                    <p className="text-xs md:text-sm text-[#00000099] mb-5">{pro?.comment}</p>
                    <p className="text-xs md:text-sm text-[#00000099] font-medium">
                      Posted on {formattedDate(pro?.createdAt)}
                    </p>
                  </div>
                ))}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem
                onClick={() => {
                  selectedComment && handleUpdateOpen(selectedComment)
                  setAnchorEl(null)
                }}
                className="flex items-center gap-2"
              >
                <ModeEdit />
                Update
              </MenuItem>
              <MenuItem
                onClick={() => {
                  if (selectedComment) {
                    deleteCommentMutation.mutate(selectedComment.id)
                  }
                  setAnchorEl(null)
                }}
                className="flex items-center gap-4"
              >
                <RiDeleteBin5Fill />
                Delete
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Detail
