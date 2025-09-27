const pastelColors = [
    "#DFF6F5",
    "#FFE6E0",
    "#FFF2DC",
    "#FFFFE5",
    "#EBFFEB",
    "#E5FBFF",
    "#E8F0FF",
    "#EEE9FF",
    "#FFE9FF",
    "#FFE5E5",
];

export function getPastelColor(name: string) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return pastelColors[Math.abs(hash) % pastelColors.length];
}
