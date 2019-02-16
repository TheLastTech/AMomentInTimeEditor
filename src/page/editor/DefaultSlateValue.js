import {Value} from 'slate'

export default Value.fromJSON({
	document: {
		nodes: [
			{
				object: 'block',
				type: 'paragraph',
				nodes: [
					{
						object: 'text',
						leaves: [
							{
								text: 'New Room',
							},
						],
					},
				],
			},
		],
	},
})
export const Fire2Slate = function (Data) {
	return Value.fromJSON({
		document: {
			nodes: [
				{
					object: 'block',
					type: 'paragraph',
					nodes: [
						{
							object: 'text',
							leaves: [
								{
									text: Data.TopText || 'New Room Text',
								},
							],
						},
					],
				},
			],
		},
	})
}
