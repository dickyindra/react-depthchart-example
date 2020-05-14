export const tooltipContent = () => {
    return ({ currentItem, xAccessor }) => {
        return {
            x: xAccessor(currentItem),
            y: [
                {
                    label: "Volume",
                    value: currentItem.volume,
                },
                {
                    label: "Volume",
                    value: currentItem.totalVolume,
                },
            ],
        }
    }
}
