export const steps = {
  start: {
    "Comment": {
      text: "Report a photo, video or comment",
      next_step: "Comment",
      action: "update_type"
    },
    "User": {
      text: "Report account",
      next_step: "User",
      action: "update_type"
    }
  },

  "Comment": {
    protect_photos: {
      text: "I don't want this account to be able to see my photos or videos or search for me",
      next_step: 'final',
      action: "update_message"
    },
    violates_guidelines:{
      text: "I believe this account violates TV Talk's community guidelines",
      next_step: 'final',
      action: "update_message"
    }
  },
  "User": {
    posting_annoying: {
      text: "Posting annoying content",
      next_step: 'final',
      action: "update_message",
    },
    posting_spam: {
      text: "Posting spam",
      next_step: 'final',
      action: "update_message",
    },
    false_account: {
      text: "This profile is pretending to be someone else",
      next_step: 'final',
      action: "update_message",
    },
    stolen_content: {
      text: "Might be posting my intellectual property without authorization",
      next_step: 'final',
      action: "update_message",
    }
  },

  final: {
    text: `Thank you for helping keep the TV Talk community safe and fun for everyone. Remember, we don't reveal who submitted reports to the person who posted the photo, video or content.

    Our team will review the post and if it violates our Community Guidelines or Terms of Use, we'll remove it.
    `,
    action: 'idle'
  }
};