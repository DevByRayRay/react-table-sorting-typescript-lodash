import React, { useState } from 'react'
import random from 'lodash.random'
import orderBy from 'lodash.orderby'
import { ArrowUp, ArrowDown } from 'react-feather'
import './App.css'

export interface Product {
	name: string
	id: number
	price: number
	color: string
}

export interface OrderProps {
	direction: OrderDirection
	visisble: boolean
}

export type OrderKey = 'price' | 'color' | 'name' | 'id'
export type OrderDirection = 'asc' | 'desc'

function generateProductDate(): Product[] {
	const productNames = ['iPhone 12', 'iPhone 11', 'iPhone XS', 'iPhone X']
	const productColors = [
		'Space grey',
		'Midnight green',
		'Cobalt blue',
		'Silver',
		'Black'
	]

	return [...Array(100).keys()].map((item, index) => {
		return {
			id: index,
			name: productNames[random(0, productNames.length - 1)],
			color: productColors[random(0, productColors.length - 1)],
			price: random(699, 1500)
		}
	})
}

function formatPrice(number: number) {
	return new Intl.NumberFormat('nl-NL', {
		style: 'currency',
		currency: 'EUR'
	}).format(number)
}

const OrderIcon = ({ direction, visisble }: OrderProps) => {
	if (visisble) {
		if (direction === 'asc') {
			return <ArrowUp color="red" size={10} />
		}

		return <ArrowDown color="red" size={10} />
	}

	return null
}

function App(): JSX.Element {
	const [products, setProducts] = useState<Product[]>(generateProductDate())
	const [orderDirection, setOrderDirection] = useState<OrderDirection>('asc')
	const [orderKey, setOrderKey] = useState<OrderKey>('id')
	const [unSortedProducts, setUnSortedProducts] = useState<Product[]>(
		generateProductDate()
	)

	function toggleOrderDirection() {
		if (orderDirection === 'asc') {
			setOrderDirection('desc')
		} else {
			setOrderDirection('asc')
		}
	}

	function order(key: OrderKey) {
		toggleOrderDirection()
		setOrderKey(key)
		const unSorted = [...products]
		const sorted = orderBy(unSorted, [key], [orderDirection])
		setProducts(sorted)
	}

	return (
		<div className="App">
			<header>
				<h1>iPhone Sorting Table</h1>
			</header>
			<table>
				<thead>
					<tr>
						<th onClick={() => order('id')}>
							<span className="th__wrapper">
								ID{' '}
								<OrderIcon
									direction={orderDirection}
									visisble={orderKey === 'id'}
								/>
							</span>
						</th>
						<th onClick={() => order('name')}>
							<span className="th__wrapper">
								Name{' '}
								<OrderIcon
									direction={orderDirection}
									visisble={orderKey === 'name'}
								/>
							</span>
						</th>
						<th onClick={() => order('color')}>
							<span className="th__wrapper">
								Color{' '}
								<OrderIcon
									direction={orderDirection}
									visisble={orderKey === 'color'}
								/>
							</span>
						</th>
						<th onClick={() => order('price')}>
							<span className="th__wrapper">
								Price{' '}
								<OrderIcon
									direction={orderDirection}
									visisble={orderKey === 'price'}
								/>
							</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{products &&
						products.map((product) => {
							return (
								<tr key={product.id}>
									<td>{product?.id + 1}</td>
									<td>{product?.name}</td>
									<td>{product?.color}</td>
									<td>{formatPrice(product?.price)}</td>
								</tr>
							)
						})}
				</tbody>
			</table>
		</div>
	)
}

export default App
