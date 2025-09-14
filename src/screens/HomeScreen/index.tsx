import { ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppbarHome from "../../components/AppbarHome";
import Card from "../../components/Card";
import Button from "../../components/Button";
import ImageCarousel from "../../components/ImageCarousel";
import FAB from "../../components/FAB";
import Chip from "../../components/Chip";
import { useSignInMutation } from "../../redux/authApi";
import { AppDispatch, RootState } from "../../redux/store";
import styles from "../../theme/GobalStyles";

const HomeScreen = ({ navigation }: any) => {
      const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((s: RootState) => s.dashboard);
const [signIn, { isLoading }] = useSignInMutation();
    const images = [
        'https://picsum.photos/700',
        'https://picsum.photos/701',
        'https://picsum.photos/702',
    ];

    return (
        <ScrollView style={styles.container}>
            <AppbarHome
                title="John Doe"
                subtitle="Welcome back!"
                avatarSource="https://example.com/avatar.jpg"
                notificationCount={3}
                onNotificationPress={() => navigation.navigate('Notifications')}
                onAvatarPress={() => navigation.openDrawer()}
            />

            <Card variant="elevated" style={styles.featuredCard}>
                <Card.Cover
                    source={{ uri: 'https://picsum.photos/700' }}
                    resizeMode="cover"
                />
                <Card.Header>
                    <Text style={styles.cardTitle}>Featured Article</Text>
                </Card.Header>
                <Card.Content>
                    <Text style={styles.cardContent}>
                        Discover the latest trends in mobile development.
                    </Text>
                    <Text style={styles.publishDate}>Published today</Text>
                </Card.Content>
                <Card.Footer>
                    <Button title="Read More" onPress={() => { }} />
                </Card.Footer>
            </Card>

            <ImageCarousel
                images={images}
                imageHeight={250}
            />

            <View style={styles.productGrid}>
                {[1, 2, 3, 4].map(item => (
                    <ProductCard key={item} />
                ))}
            </View>

            <FAB
                icon="+"
                label="Create New"
                onPress={() => console.log('FAB Pressed')}
                size="medium"
                mode="elevated"
                visible={true}
                style={styles.fab}
            />
        </ScrollView>
    );
};

// Product Card Component
const ProductCard = () => (
    <Card variant="outlined" borderRadius={12} style={styles.productCard}>
        <Card.Cover
            source={{ uri: `https://picsum.photos/300/200?${Math.random()}` }}
            style={styles.productImage}
        />
        <Card.Content style={{ padding: 12 }}>
            <Text style={{ fontWeight: 'bold' }}>Product {Math.floor(Math.random() * 100)}</Text>
            <Text style={{ color: '#e44' }}>${(Math.random() * 100).toFixed(2)}</Text>
            <View style={styles.chipContainer}>
                <Chip
                    mode="outlined"
                    backgroundColor="#e3f2fd"
                    textColor="#1565c0"
                    style={styles.smallChip}
                >
                    New
                </Chip>
            </View>
            <Button
                title="Add to Cart"
                style={styles.addToCartButton}
                onPress={()=>{}}
            />
        </Card.Content>
    </Card>
);

export default HomeScreen
