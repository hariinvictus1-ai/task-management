
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const SIZE = 33;
const STROKE_WIDTH = 2;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const getProgressColor = (progress) => {
    if (progress >= 80) return '#10B981';
    if (progress >= 30) return '#F59E0B';
    return '#EF4444';
};

export function CircularProgress({ progress = 0 }) {
    const color = getProgressColor(progress);
    const strokeDashoffset =
        CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100;

    return (
        <View style={styles.container}>
            <Svg width={SIZE} height={SIZE}>
                <Circle
                    stroke="#E5E7EB"
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={RADIUS}
                    strokeWidth={STROKE_WIDTH}
                    fill="none"
                />
                <Circle
                    stroke={color}
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={RADIUS}
                    strokeWidth={STROKE_WIDTH}
                    fill="none"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${SIZE / 2}, ${SIZE / 2}`}

                />
            </Svg>
            <Text style={[styles.text, { color }]}>
                {progress == null ? 0 : progress}%
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: SIZE,
        height: SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        position: 'absolute',
        fontSize: 7.5,
        fontWeight: '600',
    },
});
