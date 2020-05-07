import IUserServices from "./Services/Contracts/IUserService";
import UserServices from "./Services/Providers/UserService";
import IBookingServices from "./Services/Contracts/IBookingServices";
import IOfferServices from "./Services/Contracts/IOfferServices";
import OfferServices from "./Services/Providers/OfferServices";
import BookingServices from "./Services/Providers/BookingServices";

export const UserService:IUserServices=new UserServices();
export const OfferService:IOfferServices=new OfferServices();
export const BookingService:IBookingServices=new BookingServices();
