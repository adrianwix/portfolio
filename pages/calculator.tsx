import React, { useState } from 'react'
import 'styles/Calculator.scss'
import Pad from 'components/calculator/Pad'
import Display from 'components/calculator/Display'

const Calculator: React.FC = () => {
	const [acc, setAcc] = useState<number>(0)
	const [cur, setCur] = useState<number>(0)
	const [type, setType] = useState<string>('')
	const [display, setDisplay] = useState<string>('0')

	/**
	 *
	 * @description Algebraic operations of the given type
	 * @param {number} acc Accumulative value
	 * @param {number} cur Current value
	 * @param {string} type Type of algebraic operation +, -, * or /
	 * @returns Operation's result
	 */
	function operation(acc: number, cur: number, type: string): number {
		switch (type) {
			case '+':
				return (acc += cur)
			case '-':
				return (acc -= cur)
			case '*':
				return (acc *= cur)
			case '/':
				return (acc /= cur)
			default:
				throw Error('Invalid operation Type')
		}
	}

	function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		if (e.currentTarget.value) {
			const input: string = e.currentTarget.value

			if (input === '+' || input === '-' || input === '*' || input === '/') {
				if (cur !== 0) {
					setAcc(Number(cur))
					setCur(0)
					setType(input)
					setDisplay('0')
				}
			} else if (input === '=') {
				if (acc !== 0 && cur !== 0 && type !== '') {
					let operationResult = operation(acc, cur, type)
					setAcc(operationResult)
					setCur(operationResult)
					setType('')
					setDisplay(operationResult.toString())
				}
			} else if (input === '.') {
				setDisplay(display + input)
			} else if (input === 'AC') {
				setCur(0)
				setAcc(0)
				setType('')
				setDisplay('0')
			} else if (input === 'CE') {
				setCur(0)
				setDisplay('0')
			} else {
				if (display === '0') {
					setDisplay(input)
					setCur(Number(input))
				} else {
					setDisplay(display + input)
					setCur(Number(display + input))
				}
			}
		}
	}

	return (
		<main>
			<div id="calculator">
				<h1>Super Calculator</h1>
				<Display value={display}/>
				<Pad handleClick={handleClick}/>
			</div>
		</main>
	)
}

export default Calculator
