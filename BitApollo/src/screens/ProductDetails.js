import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {useQuery} from '@apollo/client';

import {GET_COMMENTS_BY_PRODUCT, GET_PRODUCT} from '../graphql/requests';
import Product from "../components/Product";
import {Card} from "../components/Card";
import {Loading} from "../components/Loading";
import {Error} from "../components/Error";
import {AddComment} from "../components/AddComment";

export function ProductDetails({route}) {


    const {productId} = route.params


    const {
        loading: productLoading,
        error: productError,
        data: productData,
    } = useQuery(GET_PRODUCT, {
        variables: {
            productId,
        },
        fetchPolicy: 'cache-first',
    });

    const {
        loading: commentsLoading,
        error: commentsError,
        data: commentsData,
    } = useQuery(GET_COMMENTS_BY_PRODUCT, {
        variables: {
            productId,
        },
        fetchPolicy: 'cache-and-network',
    });

    if (productLoading) {
        return <Loading hasBackground/>;
    }

    if (productError) {
        return <Error error={productError}/>;
    }


    function renderNumberOfComments() {
        return (
            <Text style={styles.title}>
                {commentsData && commentsData.comments.length > 0
                    ? `Comments [${commentsData.comments.length}]`
                    : 'No comments found'}
            </Text>
        );
    }

    function renderHeader() {

        const {product} = productData;
        return (
            <>
                <Product product={productData.product}/>
                <AddComment productId={product.id}
                />
                {commentsLoading && <Loading />}
                {commentsError && <Error error={commentsError} />}
                {renderNumberOfComments()}
            </>
        );
    }

    function renderComment({item: comment}) {
        return (
            <Card id={comment.id} style={styles.commentCard}>
                <Text>{comment.comment}</Text>
            </Card>
        );
    }

    return (
        <FlatList
            data={commentsData ? commentsData.comments : []}
            renderItem={renderComment}
            ListHeaderComponent={renderHeader()}
            contentContainerStyle={styles.commentsContainer}
        />

    );
}

const styles = StyleSheet.create({
    commentsContainer: {
        padding: 8,
    },
    commentCard: {
        padding: 16,
        marginVertical: 8,
    },
    title: {
        marginTop: 16,
        marginBottom: 8,
    },
});
