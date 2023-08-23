import { BASE_URL } from "../../config";

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

export const getUsers = (options: IUsersOptions) => {
   const { results = 10, nat = '', page = 1, seed = 'abc' } = options;
   return fetch(`${BASE_URL}?results=${results}&seed=${seed}abc&nat=${nat}&page=${page}`)
      .then(response => response.json())

}