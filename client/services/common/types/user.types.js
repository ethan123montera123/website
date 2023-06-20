/**
 * @namespace User
 *
 * @typedef {object} UserSignUpDto
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} phone
 * @property {string} password
 *
 * @typedef {Omit<UserSignUpDto, "password"> & { stripeId: string; }} UserAccount
 *
 * @typedef {Pick<UserAccount, "email" | "phone">} UserAccountUpdateDto
 */
export {};