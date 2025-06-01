import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ReactionCard from '../components/ReactionCard';
import { setLike } from '../services/like';

jest.mock('../services/like', () => ({
  setLike: jest.fn(() => Promise.resolve({ data: { comments: [123] } }))
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
    push: jest.fn()
  })
}));

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: { API_ENV: 'development' }
}));

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))
  });
});

describe('ReactionCard', () => {
  it('updates like count when liked', async () => {
    render(
      <ThemeProvider theme={createTheme()}>
        <ReactionCard
          id={123}
          profile={{ username: 'User', image: 'img.jpg' }}
          type="comment"
          text="hello"
          hashtag=""
          images={[]}
          videos={[]}
          created_at="2024-01-01T00:00:00Z"
          created_at_formatted="now"
          likes_count={0}
          current_user_liked={false}
          sub_comments_count={0}
          shares_count={0}
        />
      </ThemeProvider>
    );

    const likeButton = screen.getByRole('button', { name: /like/i });
    expect(likeButton).not.toHaveAttribute('checked');

    await userEvent.click(likeButton);
    await screen.findByText('1');

    expect(likeButton).toHaveAttribute('checked');
    expect(setLike).toHaveBeenCalledWith({ type: 'commentId', id: 123, isLiked: true });
  });
});
