import { Request, Response } from "express";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { db } from "../libs/db";
import { addReviewSchema } from "../validators/validate"


export const addReviewtoBook = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // const {review , rating} = req.body;

    const data = addReviewSchema.parse(req.body);

    const { review, rating } = data;

    if (!id) {
        throw new ApiError(400, "Book ID is required");
    }

    const existingBook = await db.book.findUnique({
        where: { id: id },
    });
    if (!existingBook) {
        throw new ApiError(404, "Book not found");
    }

    const addReview = await db.bookreview.create({
        data: {
            review,
            rating,
            userId: req.user!.id,
            bookId: id
        }
    });
    if (!addReview) {
        throw new ApiError(404, "Unable to create  review")
    }

    return res.status(200).json(new ApiResponse(201, addReview, "Review Added to Book successfully"))



})
export const listReviewOfBook = asyncHandler(async (req: Request, res: Response) => {

    const { bookId } = req.params;
    if (!bookId) {
        throw new ApiError(400, "Book ID is required");
    }

    const listReview = await db.bookreview.findMany({
        where: {
            bookId: bookId
        }
    })

    if (!listReview) {
        throw new ApiError(404, "Unable to fetch reviews")
    }

    return res.status(200).json(new ApiResponse(200, listReview, "All reviews fetch successfully"))


})
export const deleteReview = asyncHandler(async (req: Request, res: Response) => {

    const { reviewId } = req.params;
    if (!reviewId) {
        throw new ApiError(400, "Book ID is required");
    }

    const checkReviewExist = await db.bookreview.findMany({
        where: {
            id: reviewId
        }
    })

    if (!checkReviewExist) {
        throw new ApiError(404, "review does not exist")
    }

    const deleted = await db.bookreview.delete({
        where: {
            id: reviewId
        }
    })

    return res
        .status(200)
        .json(new ApiResponse(200, deleted, "Review deleted successfully"));


})