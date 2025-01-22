import { Errors, RoomsInterface } from "../features/interfaces/interfaces";

const roomValidation = (newRoom: RoomsInterface) => {
    const validationErrors: Errors = {};
    const numberPattern = /^\d+(\.\d+)?$/;
    if (newRoom.room_type === "") {
        validationErrors.room_type = {
            value: true,
            type: "required",
            message: "Please, select room type",
        };
    }
    if (!numberPattern.test(newRoom.price.toString())) {
        validationErrors.price = {
            value: true,
            type: "numeric",
            message: "Room price should contain only numeric digits",
        };
    }
    if (newRoom.room_number === "") {
        validationErrors.room_number = {
            value: true,
            type: "required",
            message: "Room number can't be empty",
        };
    } else if (!numberPattern.test(newRoom.room_number)) {
        validationErrors.room_number = {
            value: true,
            type: "numeric",
            message: "Room number should contain only numeric digits",
        };
    } else if (newRoom.room_number.length !== 3) {
        validationErrors.room_number = {
            value: true,
            type: "length",
            message: "Room number should be exactly three digits",
        };
    } else {
        validationErrors.room_number = { value: false, type: "", message: "" };
    }
    const validation = !Object.values(validationErrors).some((error) => error.value);
    return {validation,validationErrors};
};

export default roomValidation;