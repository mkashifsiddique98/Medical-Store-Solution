//* Importing Constants
import {
  SAVE_COMPOUNDING_MEDICINE_FAIL,
  SAVE_COMPOUNDING_MEDICINE_REQUEST,
  SAVE_COMPOUNDING_MEDICINE_SUCCESS,
} from '../constants/compoundingMedicineCostants.js'

//? ================ 1) Save Compounding Medicine Reducer ===========
export const saveCompoundingMedicineReducer = (
  state = { compoundingMedicine: {}, success: false, loading: false },
  action
) => {
  switch (action.type) {
    //* Save Compounding Medicine Request Case
    case SAVE_COMPOUNDING_MEDICINE_REQUEST:
      return {
        loading: true,
        compoundingMedicine: {},
      }
    //* Save Compounding Medicine Success Case
    case SAVE_COMPOUNDING_MEDICINE_SUCCESS:
      return {
        loading: false,
        success: true,
        compoundingMedicine: action.payload,
      }
    //* Save Compounding Medicine Fail Case
    case SAVE_COMPOUNDING_MEDICINE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
