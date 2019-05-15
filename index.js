import React from 'react';
import Cleave from 'cleave.js/react';

export default props => {
	const {
		editable = false,
		format = [],
		headerStyle = {},
		id,
		multiple = false,
		onChange,
		onChangeText,
		style = {},
		...defaultProps
	} = props;

	return {
		...defaultProps,
		style: { ...style, display: 'flex', alignItems: 'center' },
		headerStyle: { ...headerStyle, display: 'flex', alignItems: 'center' },
		Cell: ({ index, original, value }) => {
			if (editable && !multiple) {
				if (format.length != 0) {
					let blocks = format.map(d => parseInt(d.characterLength)),
						delimiters = format.map(d => d.delimiter);
					delimiters.pop();
					return (
						<Cleave
							autoComplete="off"
							class="form-control"
							onKeyDown={e => {
								if (e.key === 'Enter') {
									onChange({ Id: original.Id, [id]: e.target.rawValue });
								}
								return;
							}}
							options={{ delimiters, blocks }}
							value={value ? value : ''}
						/>
					);
				} else {
					return (
						<input
							type="number"
							class="form-control"
							value={value}
							onChange={e => onChangeText(index, id, e.target.value)}
							onKeyDown={e => {
								if (e.key === 'Enter') {
									onChange({ Id: original.Id, [id]: e.target.value });
								}
								return;
							}}
						/>
					);
				}
			} else {
				if (format.length != 0) {
					let blocks = format.map(d => parseInt(d.characterLength)),
						delimiters = format.map(d => d.delimiter);
					delimiters.pop();
					return (
						<Cleave
							disabled={true}
							options={{ delimiters, blocks, numericOnly: true }}
							value={value}
							style={{ padding: 0, border: 'none', backgroundColor: 'transparent' }}
						/>
					);
				}
				return <span>{value}</span>;
			}
		},
		Filter: ({ filter, onChange }) => {
			return (
				<input
					type="number"
					class="form-control"
					onChange={e => onChange(e.target.value)}
					value={filter ? filter.value : ''}
					placeholder="Search..."
				/>
			);
		}
	};
};
