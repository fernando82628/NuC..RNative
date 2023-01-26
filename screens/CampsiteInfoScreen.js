import { FlatList, StyleSheet, Text, View, Button, Modal, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { useState } from 'react';
import { Rating, Input } from 'react-native-elements';
// import { ListItem } from 'react-native-elements/dist/list/ListItem';
import { postComment } from '../features/comments/commentsSlice';

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false)
    const [rating, setRating] = useState(5)
    const [author, setAuthor] = useState('')
    const [text, setText] = useState('')

    const handleSubmit = () => {
        const newComment = {
            author,
            rating,
            text,
            campsiteId: campsite.id
        }
        dispatch(postComment(newComment))
        setShowModal(!showModal)
    }

    const resetForm = () => {
        setRating(5)
        setAuthor('')
        setText('')
    }

    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Rating 
                startingValue={item.rating}
                imageSize={10}
                style={{alignItems: 'flex-start', paddingVertical: '5%'}}
                readonly

                />
                
                <Text style={{ fontSize: 12 }}>
                    {`-- ${item.author}, ${item.date}`}
                </Text>
            </View>
        )
    }

    return (
        <>
            <FlatList
                data={comments.commentsArray.filter(
                    (comment) => comment.campsiteId === campsite.id
                )}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ marginHorizontal: 20, paddingVertical: 20 }}
                ListHeaderComponent={
                    <>
                        <RenderCampsite
                            onShowModal={() => setShowModal(!showModal)}
                            campsite={campsite}
                            isFavorite={favorites.includes(campsite.id)}
                            markFavorite={() => dispatch(toggleFavorite(campsite.id))}
                        />
                        <Text style={styles.commentsTitle}>Comments</Text>
                    </>
                }
            />
            <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
            >
                <View style={styles.modal}>
                    <Rating
                        showRating
                        startingValue={rating}
                        imageSize={40}
                        onFinishRating={(newrating) => setRating(newrating)}
                        style={{ paddingVertical: 10 }}
                    />
                    <Input
                        placeholder='Author'
                        leftIcon={{ name: 'user-o', type: 'font-awesome', }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={(auth) => setAuthor(auth)}
                        value={author}
                    />

                    <Input
                        placeholder='Comment'
                        leftIcon={{ name: 'comment-o', type: 'font-awesome', }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={(newcomment) => setText(newcomment)}
                        value={text}
                    />

                    <View style={{ margin: 10 }}>
                        <Button
                            title='submit'
                            color='#5637DD'
                            onPress={
                                () => {
                                    handleSubmit()
                                    resetForm()
                                }
                            }
                        />
                    </View>

                    <View style={{ margin: 10 }}>
                        <Button
                            title='Cancel'
                            onPress={
                                () => {
                                    setShowModal(!showModal)
                                    resetForm()
                                }
                            }
                            color='#808080'

                        />

                    </View>
                </View>

            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default CampsiteInfoScreen;