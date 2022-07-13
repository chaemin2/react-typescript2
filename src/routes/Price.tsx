import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinTickers } from './api';

interface PriceProps {
	coinId: string;
}

interface PriceData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: {
		USD: {
			ath_date: string;
			ath_price: number;
			market_cap: number;
			market_cap_change_24h: number;
			percent_change_1h: number;
			percent_change_1y: number;
			percent_change_6h: number;
			percent_change_7d: number;
			percent_change_12h: number;
			percent_change_15m: number;
			percent_change_24h: number;
			percent_change_30d: number;
			percent_change_30m: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
		};
	};
}

const Box = styled.div`
	background-color: ${props => props.theme.coinBgColor};
	border-radius: 5px;
	color: ${props => props.theme.textColor};
	width: 48%;
	height: 60px;
	display: inline-table;
	margin: 5px;
	align-items: center;
	text-align: center;
`;

const Title = styled.h3`
	font-weight: bolder;
	font-size: 15px;
	margin: 10px 0px;
`;

const Content = styled.h3`
	font-weight: bolder;
	font-size: 15px;
`;

function Price({ coinId }: PriceProps) {
	const { isLoading, data } = useQuery<PriceData>(['tickers_price', coinId], () => fetchCoinTickers(coinId), {
		refetchInterval: 5000
	});

	return (
		<>
			{isLoading ? (
				'Loading...'
			) : (
				<>
					<Box>
						<Title>PRICE</Title>
						<Content>{data?.quotes.USD.price.toFixed(3)}</Content>
					</Box>
					<Box>
						<Title>ATH_PRICE</Title>
						<Content>{data?.quotes.USD.ath_price.toFixed(3)}</Content>
					</Box>
				</>
			)}
		</>
	);
}

export default Price;
