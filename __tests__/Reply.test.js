import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Reply } from '../components/Chat/Reply';

const postMock = jest.fn(() => Promise.resolve({ data: {} }));

jest.mock('../services/api', () => () => ({ axios: { post: postMock } }));

describe('Reply component', () => {
  beforeEach(() => {
    postMock.mockClear();
  });

  it('posts a reply and clears the input', async () => {
    const profile = { image: 'img.jpg', username: 'john' };
    const comment = { id: 42 };

    render(<Reply isMobile={false} profile={profile} comment={comment} />);

    const input = screen.getByPlaceholderText("What's on your mind?");
    fireEvent.change(input, { target: { value: 'Hello world' } });

    const button = screen.getByRole('button', { name: 'Reply' });
    fireEvent.click(button);

    await waitFor(() => expect(postMock).toHaveBeenCalled());
    expect(postMock).toHaveBeenCalledWith(
      `/sub_comments?comment_id=${comment.id}`,
      {
        sub_comment: {
          text: 'Hello world',
          comment_id: comment.id,
          sub_comment_id: null,
          images: [],
          videos: [],
          mute_notifications: false,
        },
      }
    );
    await waitFor(() => expect(input.value).toBe(''));
  });
});
