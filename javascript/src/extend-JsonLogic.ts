/**
 * Extend JsonLogic with custom operations,
 * and provide stricter typings than provided with the library.
 */


import { RulesLogic, add_operation, apply } from "json-logic-js"

// TODO  generify this with return type parameter?
export type DataAccess = { "var": JsonLogicRule }
export type IfThenElse = { "if": [ JsonLogicRule, JsonLogicRule, JsonLogicRule ] }
export type PlusDays = { "plusTime": [ JsonLogicRule, JsonLogicRule, JsonLogicRule ] }
export type ArrayOperation =
      { "all":   [ JsonLogicRule, JsonLogicRule ] }
    | { "some":  [ JsonLogicRule, JsonLogicRule ] }
    | { "merge": JsonLogicRule[] }
    | { "reduce": [ JsonLogicRule, JsonLogicRule, JsonLogicRule ] }
    | { "in": [ JsonLogicRule, JsonLogicRule ] }
export type BinaryOperation =
      { ">":   [ JsonLogicRule, JsonLogicRule ] }
    | { ">=":  [ JsonLogicRule, JsonLogicRule ] }
    | { "<":   [ JsonLogicRule, JsonLogicRule ] }
    | { "<=":  [ JsonLogicRule, JsonLogicRule ] | [ JsonLogicRule, JsonLogicRule, JsonLogicRule ] }
    | { "==":  [ JsonLogicRule, JsonLogicRule ] }
    | { "===": [ JsonLogicRule, JsonLogicRule ] }
    | { "and": [ JsonLogicRule, JsonLogicRule ] }
    | { "+":   [ JsonLogicRule, JsonLogicRule ] }
export type LogicalOperation =
    | { "!":   [ JsonLogicRule ] }

/**
 * TypeScript typings for JsonLogic that are a bit more exact than JsonLogic's own,
 * and which can be extended with our own custom operations.
 */
export type JsonLogicRule =
    | boolean
    | string
    | number
    | Date
    | JsonLogicRule[]
    | DataAccess
    | IfThenElse
    | PlusDays
    | ArrayOperation
    | BinaryOperation
    | LogicalOperation

// TODO  map this to a JSON Schema, and compare with "official" one


let extended = false

export const extendJsonLogic = () => {
    if (extended) {
        return
    }
    // Steffen Schulze's custom op for dates:
    add_operation("plusTime", (dateTimeStr, amount, unit) => {
        let dateTime = new Date(dateTimeStr)
        if (unit === "day") {
            dateTime.setDate(dateTime.getDate() + amount)
        } else if (unit === "hour") {
            dateTime.setHours(dateTime.getHours() + amount)
        }
        return dateTime
    })
    extended = true
}


export const applyLogic = (jsonLogicRule: JsonLogicRule, data: any) => apply(jsonLogicRule as RulesLogic, data)

