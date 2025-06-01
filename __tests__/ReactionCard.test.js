import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReactionCard from '../components/ReactionCard';
import { setLike } from '../services/like';

jest.mock('../services/like');
jest.mock('../components/ReactionCard/CardHeader', () => () => <div data-testid="card-header" />);
jest.mock('../components/Chat/Share', () => () => <div data-testid="share" />);
jest.mock('next/router', () => ({ useRouter: () => ({ push: jest.fn(), asPath: '/' }) }));
jest.mock('next/config', () => () => ({ publicRuntimeConfig: { API_ENV: 'development' } }));


describe('ReactionCard like button', () => {
  it('updates like count and checked state on click', async () => {
    setLike.mockResolvedValue({ data: { comments: [123] } });

    render(
      <ReactionCard
        profile={{ id: 1, username: 'User', image: '' }}
        id={123}
        type="comment"
        text="Hello"
        hashtag=""
        images={[]}
        videos={[]}
        created_at="2023-01-01"
        created_at_formatted="just now"
        likes_count={0}
        current_user_liked={false}
        sub_comments_count={0}
        shares_count={0}
        tmsId="tms1"
      />
    );

    const likeButton = screen.getByLabelText(/like/i);
    fireEvent.click(likeButton);

    await waitFor(() => expect(setLike).toHaveBeenCalled());
    await waitFor(() => expect(likeButton.getAttribute('checked')).toBe('true'));
    await waitFor(() => expect(screen.getByText('1')).toBeInTheDocument());
  });
});
