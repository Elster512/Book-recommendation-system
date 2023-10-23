import { useDispatch } from "react-redux";
import { AppDisaptch } from "./store";

export const useAppDispatch = () => useDispatch<AppDisaptch>();
