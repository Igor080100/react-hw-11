import { API_DEFAULT_NAT, API_DEFAULT_PAGE, API_DEFAULT_RESULTS, API_DEFAULT_SEED, BASE_URL } from "../../config";
import queryString from 'query-string'

export interface IUsersOptions {
   results?: number;
   nat?: string;
   page?: number;
   seed?: string;
}

// export const getUsers = (page) => {
//   return fetch(`https://randomuser.me/api/?seed=abc&results=10&nat=ua&page=${page}`)
//     .then(response => response.json());
// }

// export const getUsers = (options: any) => {
//    const { results = 10, nat = 'gb', page = 1, seed = 'abc' } = options;
//    fetch(`https://randomuser.me/api?results=${results}&seed=${seed}abc&nat=${nat}&page=${page}`)
//       .then(response => response.json())
// }

/**
 * 
 * @param {object}options 
 * @param {number}options.results
 * @param {string}options.nat
 * @param {number}options.page
 * @param {string}options.seed
 * @returns {Promise}
 */

export const getUsers = (options: IUsersOptions) => {
   const defaultOptions = {
      results: API_DEFAULT_RESULTS,
      nat: API_DEFAULT_NAT,
      page: API_DEFAULT_PAGE,
      seed: API_DEFAULT_SEED
   }

   const finallyOptions = {
      ...defaultOptions,
      ...options
   }
   return fetch(`${BASE_URL}?${queryString.stringify(finallyOptions)}`)
      .then(response => response.json())
}