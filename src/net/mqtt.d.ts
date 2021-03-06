import { Json } from "../lang/type";

/// <reference types="node" />
export declare type QoS = 0 | 1 | 2
export declare type PacketCmd = 'connack' |
  'connect' |
  'disconnect' |
  'pingreq' |
  'pingresp' |
  'puback' |
  'pubcomp' |
  'publish' |
  'pubrel' |
  'pubrec' |
  'suback' |
  'subscribe' |
  'unsuback' |
  'unsubscribe'
export interface IPacket {
  cmd: PacketCmd
  messageId?: number
  length?: number
}
export interface IConnectPacket extends IPacket {
  cmd: 'connect'
  clientId: string
  protocolVersion?: 4 | 3
  protocolId?: 'MQTT' | 'MQIsdp'
  clean?: boolean
  keepalive?: number
  username?: string
  password?: Uint8Array
  will?: {
    topic: string;
    payload: Uint8Array;
    qos?: QoS;
    retain?: boolean;
  }
}
export interface IPublishPacket extends IPacket {
  cmd: 'publish'
  qos: QoS
  dup: boolean
  retain: boolean
  topic: string
  payload: string | Uint8Array
}
export interface IConnackPacket extends IPacket {
  cmd: 'connack'
  returnCode: number
  sessionPresent: boolean
}
export interface ISubscribePacket extends IPacket {
  cmd: 'subscribe'
  subscriptions: Array<{
    topic: string;
    qos: QoS;
  }>
}
export interface ISubackPacket extends IPacket {
  cmd: 'suback'
  granted: number[]
}
export interface IUnsubscribePacket extends IPacket {
  cmd: 'unsubscribe'
  unsubscriptions: string[]
}
export interface IUnsubackPacket extends IPacket {
  cmd: 'unsuback'
}
export interface IPubackPacket extends IPacket {
  cmd: 'puback'
}
export interface IPubcompPacket extends IPacket {
  cmd: 'pubcomp'
}
export interface IPubrelPacket extends IPacket {
  cmd: 'pubrel'
}
export interface IPubrecPacket extends IPacket {
  cmd: 'pubrec'
}
export interface IPingreqPacket extends IPacket {
  cmd: 'pingreq'
}
export interface IPingrespPacket extends IPacket {
  cmd: 'pingresp'
}
export interface IDisconnectPacket extends IPacket {
  cmd: 'disconnect'
}
export interface ISubscriptionMap {
	/**
	 * object which has topic names as object keys and as value the QoS, like {'test1': 0, 'test2': 1}.
	 */
	[topic: string]: QoS
}
export interface ISubscriptionGrant {
	/**
	 *  is a subscribed to topic
	 */
	topic: string
	/**
	 *  is the granted qos level on it, may return 128 on error
	 */
	qos: QoS | number
}

export interface IClientOptions extends ISecureClientOptions {
	port?: number // port is made into a number subsequently
	host?: string // host does NOT include port
	hostname?: string
	path?: string
	protocol?: 'wss' | 'ws' | 'mqtt' | 'mqtts' | 'tcp' | 'ssl' | 'wx' | 'wxs'
  
	wsOptions?: {
	  [x: string]: any;
	}
	/**
	 *  10 seconds, set to 0 to disable
	 */
	keepalive?: number
	/**
	 * 'mqttjs_' + Math.random().toString(16).substr(2, 8)
	 */
	clientId?: string
	/**
	 * 'MQTT'
	 */
	protocolId?: string
	/**
	 * 4
	 */
	protocolVersion?: number
	/**
	 * true, set to false to receive QoS 1 and 2 messages while offline
	 */
	clean?: boolean
	/**
	 * 1000 milliseconds, interval between two reconnections
	 */
	reconnectPeriod?: number
	/**
	 * 30 * 1000 milliseconds, time to wait before a CONNACK is received
	 */
	connectTimeout?: number
	/**
	 * the username required by your broker, if any
	 */
	username?: string
	/**
	 * the password required by your broker, if any
	 */
	password?: string
	/**
	 * a Store for the incoming packets
	 */
	incomingStore?: any
	/**
	 * a Store for the outgoing packets
	 */
	outgoingStore?: any
	queueQoSZero?: boolean
	reschedulePings?: boolean
	servers?: Array<{
	  host: string;
	  port: number;
	}>
	/**
	 * true, set to false to disable re-subscribe functionality
	 */
	resubscribe?: boolean
	/**
	 * a message that will sent by the broker automatically when the client disconnect badly.
	 */
	will?: {
	  /**
	   * the topic to publish
	   */
	  topic: string;
	  /**
	   * the message to publish
	   */
	  payload: string;
	  /**
	   * the QoS
	   */
	  qos: QoS;
	  /**
	   * the retain flag
	   */
	  retain: boolean;
	}
	transformWsUrl?: (url: string, options: IClientOptions, client: MqttClient) => string
  }
  export interface ISecureClientOptions {
	/**
	 * optional private keys in PEM format
	 */
	key?: string | string[] | Uint8Array | Uint8Array[] | Object[]
	/**
	 * optional cert chains in PEM format
	 */
	cert?: string | string[] | Uint8Array | Uint8Array[]
	/**
	 * Optionally override the trusted CA certificates in PEM format
	 */
	ca?: string | string[] | Uint8Array | Uint8Array[]
	rejectUnauthorized?: boolean
  }
  export interface IClientPublishOptions {
	/**
	 * the QoS
	 */
	qos: QoS
	/**
	 * the retain flag
	 */
	retain?: boolean
	/**
	 * whether or not mark a message as duplicate
	 */
	dup?: boolean
  }
  export interface IClientSubscribeOptions {
	/**
	 * the QoS
	 */
	qos: QoS
}
export declare type ClientSubscribeCallback = (err: Error, granted: ISubscriptionGrant[]) => void
export declare type OnMessageCallback = (topic: string, payload: Uint8Array, packet?: Packet) => void
export declare type OnPacketCallback = (packet: Packet) => void
export declare type OnErrorCallback = (error: Error) => void
export declare type PacketCallback = (error?: Error, packet?: Packet) => any
export declare type CloseCallback = () => void

export declare type Packet = IConnectPacket |
  IPublishPacket |
  IConnackPacket |
  ISubscribePacket |
  ISubackPacket |
  IUnsubscribePacket |
  IUnsubackPacket |
  IPubackPacket |
  IPubcompPacket |
  IPubrelPacket |
  IPingreqPacket |
  IPingrespPacket |
  IDisconnectPacket |
  IPubrecPacket

/**
 * 3D渲染模块，封装自three.js库
 */
export module mqtt {
	/**
	 * @description 连接服务器
	 */
	function connect (brokerUrl?: string | any, opts?: IClientOptions): MqttClient
	
	
}


export interface MqttClient{
	/**
	 * @description 发布消息
	 */
	publish (topic: string, message: string | Uint8Array, callback?: PacketCallback): this

	/**
	 * @description 订阅消息
	 */
	subscribe (topic:string | string[] | ISubscriptionMap, callback?: ClientSubscribeCallback): this

	/**
	 * @description 退订
	 */
	unsubscribe (topic: string | string[], callback?: PacketCallback): this

	/**
	 * @description 关闭连接
	 */
	end (force?: boolean, cb?: CloseCallback): this

	/**
	 * @description 重新连接
	 */
	reconnect (): this

	/**
	 * @description 事件
	 */
	on (event: 'message', cb: OnMessageCallback): this
	on (event: 'packetsend' | 'packetreceive', cb: OnPacketCallback): this
	on (event: 'error', cb: OnErrorCallback): this
	on (event: string, cb: Function): this
}
