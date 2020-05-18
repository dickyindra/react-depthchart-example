export const tooltipContent = () => {
    return ({ currentItem, xAccessor }) => {
        return {
            x: `Price: ${xAccessor(currentItem)}`,
            y: [
                {
                    label: "Total Volume",
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
