import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Mic, MicOff, VideoOff, Phone, Users, MessageSquare, Settings, Share2, Trash2, Edit2, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Room {
  id: string;
  name: string;
  participants: number;
  isLocked: boolean;
  topic?: string;
  recordings?: Recording[];
}

interface Recording {
  id: string;
  name: string;
  duration: string;
  date: Date;
  size: string;
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isSpeaking: boolean;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
}

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

function DeleteConfirmation({ isOpen, onClose, onConfirm, itemName }: DeleteConfirmationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center mb-4 text-red-500">
              <AlertTriangle className="w-6 h-6 mr-2" />
              <h3 className="text-xl font-semibold">Confirm Deletion</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete "{itemName}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function VideoChat() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([
    { 
      id: '1', 
      name: 'JavaScript Study Group', 
      participants: 4, 
      isLocked: false,
      topic: 'Advanced React Hooks',
      recordings: [
        {
          id: '1',
          name: 'React Hooks Discussion',
          duration: '1:30:00',
          date: new Date('2024-03-15'),
          size: '250 MB',
        },
        {
          id: '2',
          name: 'Custom Hooks Workshop',
          duration: '45:00',
          date: new Date('2024-03-16'),
          size: '120 MB',
        },
      ],
    },
    { 
      id: '2', 
      name: 'React Workshop', 
      participants: 6, 
      isLocked: false,
      topic: 'Building Custom Hooks',
      recordings: [],
    },
  ]);

  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      isSpeaking: false,
      isVideoEnabled: true,
      isAudioEnabled: true,
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isSpeaking: true,
      isVideoEnabled: true,
      isAudioEnabled: true,
    },
  ]);

  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  const initializeMedia = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: isVideoEnabled,
        audio: isAudioEnabled,
      });
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Failed to access media devices:', error);
      toast.error('Failed to access camera or microphone');
    }
  }, [isVideoEnabled, isAudioEnabled]);

  useEffect(() => {
    if (selectedRoom) {
      initializeMedia();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [selectedRoom, initializeMedia, stream]);

  const toggleAudio = useCallback(() => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isAudioEnabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  }, [stream, isAudioEnabled]);

  const toggleVideo = useCallback(() => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  }, [stream, isVideoEnabled]);

  const handleCreateRoom = () => {
    const newRoom: Room = {
      id: crypto.randomUUID(),
      name: 'New Study Room',
      participants: 1,
      isLocked: false,
      topic: 'General Discussion',
      recordings: [],
    };
    setRooms(prev => [...prev, newRoom]);
    toast.success('Room created successfully!');
  };

  const handleLeaveRoom = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setSelectedRoom(null);
    setStream(null);
    toast.success('Left the room');
  };

  const handleShareRoom = () => {
    navigator.clipboard.writeText(`Join my study room: ${window.location.origin}/video-chat?room=${selectedRoom}`);
    toast.success('Room link copied to clipboard!');
  };

  const handleDeleteRecording = (recordingId: string) => {
    setRooms(prev => prev.map(room => {
      if (room.id === selectedRoom && room.recordings) {
        return {
          ...room,
          recordings: room.recordings.filter(rec => rec.id !== recordingId),
        };
      }
      return room;
    }));
    toast.success('Recording deleted successfully');
  };

  const handleEditRecording = (recordingId: string, newName: string) => {
    setRooms(prev => prev.map(room => {
      if (room.id === selectedRoom && room.recordings) {
        return {
          ...room,
          recordings: room.recordings.map(rec => 
            rec.id === recordingId ? { ...rec, name: newName } : rec
          ),
        };
      }
      return room;
    }));
    setIsEditing(null);
    toast.success('Recording name updated');
  };

  const currentRoom = rooms.find(room => room.id === selectedRoom);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Rooms List */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Study Rooms</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCreateRoom}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Create Room
                </motion.button>
              </div>
              <div className="space-y-4">
                {rooms.map((room) => (
                  <motion.button
                    key={room.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedRoom(room.id)}
                    className={`w-full p-4 rounded-lg border transition-all ${
                      selectedRoom === room.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{room.name}</h3>
                        {room.topic && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Topic: {room.topic}
                          </p>
                        )}
                        <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                          <Users className="w-4 h-4 mr-1" />
                          {room.participants} participants
                        </div>
                      </div>
                      {room.isLocked && (
                        <span className="text-yellow-500">
                          <Settings className="w-5 h-5" />
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Recordings Section */}
            {currentRoom?.recordings && currentRoom.recordings.length > 0 && (
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Recordings</h3>
                <div className="space-y-4">
                  {currentRoom.recordings.map((recording) => (
                    <div
                      key={recording.id}
                      className="p-4 border dark:border-gray-700 rounded-lg"
                    >
                      {isEditing === recording.id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="flex-1 px-3 py-1 rounded border dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                          />
                          <button
                            onClick={() => handleEditRecording(recording.id, editName)}
                            className="text-primary-500 hover:text-primary-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setIsEditing(null)}
                            className="text-gray-500 hover:text-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{recording.name}</h4>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {
                                  setIsEditing(recording.id);
                                  setEditName(recording.name);
                                }}
                                className="p-1 hover:text-primary-500"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setItemToDelete({ id: recording.id, name: recording.name });
                                  setShowDeleteConfirmation(true);
                                }}
                                className="p-1 hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            <div>Duration: {recording.duration}</div>
                            <div>Date: {recording.date.toLocaleDateString()}</div>
                            <div>Size: {recording.size}</div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Video Area */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {selectedRoom ? (
                <>
                  <div className="aspect-video bg-gray-900 relative">
                    <div className="absolute inset-0 grid grid-cols-2 gap-2 p-4">
                      {/* Main Video */}
                      <div className="col-span-2 relative rounded-lg overflow-hidden bg-gray-800">
                        {isVideoEnabled ? (
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <VideoOff className="w-16 h-16 text-gray-500" />
                          </div>
                        )}
                        <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-lg text-white text-sm">
                          You
                        </div>
                      </div>

                      {/* Participant Videos */}
                      {participants.map((participant) => (
                        <div key={participant.id} className="relative rounded-lg overflow-hidden bg-gray-800">
                          {participant.isVideoEnabled ? (
                            <img
                              src={participant.avatar}
                              alt={participant.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <VideoOff className="w-8 h-8 text-gray-500" />
                            </div>
                          )}
                          <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded-lg text-white text-sm">
                            {participant.name}
                          </div>
                          {participant.isSpeaking && (
                            <div className="absolute inset-0 border-2 border-primary-500 rounded-lg animate-pulse" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowParticipants(!showParticipants)}
                          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          <Users className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleShareRoom}
                          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          <Share2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={toggleAudio}
                          className={`p-4 rounded-full transition-colors ${
                            isAudioEnabled
                              ? 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                              : 'bg-red-500 text-white hover:bg-red-600'
                          }`}
                        >
                          {isAudioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={toggleVideo}
                          className={`p-4 rounded-full transition-colors ${
                            isVideoEnabled
                              ? 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                              : 'bg-red-500 text-white hover:bg-red-600'
                          }`}
                        >
                          {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleLeaveRoom}
                          className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                        >
                          <Phone className="w-6 h-6" />
                        </motion.button>
                      </div>
                    </div>

                    {showParticipants && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <h3 className="font-semibold mb-2">Participants ({participants.length + 1})</h3>
                        <div className="space-y-2">
                          {[
                            { name: 'You (Host)', avatar: 'https://example.com/avatar.jpg' },
                            ...participants,
                          ].map((participant, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200" />
                                <span>{participant.name}</span>
                              </div>
                              {index === 0 && (
                                <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded">
                                  Host
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </>
              ) : (
                <div className="p-12 text-center">
                  <Video className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">No Room Selected</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Select a room from the list to join a video call
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmation
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={() => {
          if (itemToDelete) {
            handleDeleteRecording(itemToDelete.id);
          }
          setShowDeleteConfirmation(false);
          setItemToDelete(null);
        }}
        itemName={itemToDelete?.name || ''}
      />
    </motion.div>
  );
}

export default VideoChat;