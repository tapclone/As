import React, { useState, useEffect } from 'react';
import Header from '../components/header/Header';
import Card from '../components/card/Card';
import Loader from '../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/action/PostAction';
import Paginate from '../components/paginate/Paginate';

function HomePage() {
	
	const dispatch = useDispatch();
	const { posts, loading } = useSelector((state) => state.PostReducers);
	const [currentPage, setCurrentPage] = useState(1);

    console.log(posts,"dkc");
	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	const postPerPage = 5;
	const totalPosts = posts.length;
	const indexOfLastPost = currentPage * postPerPage;
	const indexOfFirstPost = indexOfLastPost - postPerPage;
	const filterPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
	useEffect(()=>{
		window.scrollTo(0,0)
	},[filterPosts])
  return (
    <>
			<Header/>
			{loading ? (
				<Loader />
			) : (
				<div className="container">
					<div className="posts">
						{filterPosts.map((post) => (
							<Card post={post} />
						))}
					</div>
					{totalPosts > postPerPage && (
							<Paginate
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
							totalPosts={totalPosts}
							postPerPage={postPerPage}
						/>
						
					)}
				</div>
			)}
		</>
  )
}

export default HomePage