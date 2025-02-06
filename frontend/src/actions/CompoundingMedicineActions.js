//* Importing Constants
import {
  SAVE_COMPOUNDING_MEDICINE_FAIL,
  SAVE_COMPOUNDING_MEDICINE_REQUEST,
  SAVE_COMPOUNDING_MEDICINE_SUCCESS,
} from '../constants/compoundingMedicineCostants.js'

//* Impoprted Libraries
import axios from 'axios'
import {API_BASE_URL} from "../../src/config"

// ? =============== 1) Action for Save Compounding Medicine Reducer ====================
export const saveCompoundingMedicineAction =
  ({ name, email, image, message, address }) =>
  async (dispatch, getState) => {
    // ! Save Compounding Medicine Request
    try {
      dispatch({
        type: SAVE_COMPOUNDING_MEDICINE_REQUEST,
      })

      //! Accessing to the uerInfo to access token
      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(
        `${API_BASE_URL}/api/compounding-medicine`,
        { name, email, image, message, address },
        config
      )
      // ! Save Compounding Medicine Success
      dispatch({
        type: SAVE_COMPOUNDING_MEDICINE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      // ! Save Compounding Medicine Fail
      dispatch({
        type: SAVE_COMPOUNDING_MEDICINE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
