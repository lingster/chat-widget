import React from 'react';
import {Box, Flex, Text} from 'theme-ui';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {Message} from '../utils';

dayjs.extend(utc);

const formatRelativeTime = (date: dayjs.Dayjs) => {
  const ms = dayjs().diff(date, 'second');
  const mins = Math.floor(ms / 60);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);

  if (ms < 10) {
    return 'just now';
  } else if (ms < 60) {
    return `${ms} seconds ago`;
  } else if (mins <= 60) {
    return `${mins} minute${mins === 1 ? '' : 's'} ago`;
  } else if (hrs <= 24) {
    return `${hrs} hour${hrs === 1 ? '' : 's'} ago`;
  } else {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }
};

type Props = {
  message: Message;
  isMe?: boolean;
  isLastInGroup?: boolean;
  shouldDisplayTimestamp?: boolean;
};

const ChatMessage = ({
  message,
  isMe,
  isLastInGroup,
  shouldDisplayTimestamp,
}: Props) => {
  const {body, created_at, sender} = message;
  const created = dayjs.utc(created_at);
  const timestamp = formatRelativeTime(created);
  // TODO: include profile photo if available
  const letter = sender && sender.length ? sender[0].toUpperCase() : 'A';

  if (isMe) {
    return (
      <Box pr={0} pl={4} pb={isLastInGroup ? 3 : 2}>
        <Flex sx={{justifyContent: 'flex-end'}}>
          <Box
            px='14px'
            py={2}
            sx={{
              color: 'background',
              bg: 'primary',
              borderRadius: 4,
            }}
          >
            <Text>{body}</Text>
          </Box>
        </Flex>
        {shouldDisplayTimestamp && (
          <Flex m={1} sx={{justifyContent: 'flex-end'}}>
            <Text sx={{color: 'gray'}}>Sent {timestamp}</Text>
          </Flex>
        )}
      </Box>
    );
  }

  return (
    <Box pr={4} pl={0} pb={isLastInGroup ? 3 : 2}>
      <Flex sx={{justifyContent: 'flex-start', alignItems: 'center'}}>
        <Flex
          mr={2}
          sx={{
            bg: 'primary',
            height: 32,
            width: 32,
            borderRadius: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
          }}
        >
          {letter}
        </Flex>

        <Box
          px='14px'
          py={2}
          sx={{
            color: 'text',
            bg: 'rgb(245, 245, 245)',
            borderRadius: 4,
            maxWidth: '80%',
          }}
        >
          {body}
        </Box>
      </Flex>
      {shouldDisplayTimestamp && (
        <Flex m={1} sx={{justifyContent: 'flex-start'}}>
          {/* TODO: the name should be dynamic */}
          <Text sx={{color: 'gray'}}>Agent · Sent {timestamp}</Text>
        </Flex>
      )}
    </Box>
  );
};

export default ChatMessage;
